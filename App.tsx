import React, { useState, useEffect, useCallback } from 'react';
import { db, firebaseInitializationError } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { CardInfo, BankAccountInfo, CardType } from './types';
import CardComponent from './components/CardComponent';
import BankAccountComponent from './components/BankAccountComponent';
import CardFormModal from './components/AddCardModal';
import AccountFormModal from './components/AddAccountModal';
import SettingsModal from './components/SettingsModal';
import ConfirmationModal from './components/ConfirmationModal';
import { PlusIcon, WalletIcon, BankIcon, SettingsIcon } from './constants';

type View = 'cards' | 'accounts';
type Item = CardInfo | BankAccountInfo;
type ItemType = 'card' | 'account';

const getCardType = (cardNumber: string): CardType => {
    if (/^4/.test(cardNumber)) return CardType.VISA;
    if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) return CardType.MASTERCARD;
    if (/^3[47]/.test(cardNumber)) return CardType.AMEX;
    if (/^6(?:011|5)/.test(cardNumber)) return CardType.DISCOVER;
    return CardType.UNKNOWN;
};

const App: React.FC = () => {
    const [cards, setCards] = useState<CardInfo[]>([]);
    const [accounts, setAccounts] = useState<BankAccountInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(firebaseInitializationError);
    const [activeView, setActiveView] = useState<View>('cards');

    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [isAccountModalOpen, setAccountModalOpen] = useState(false);
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
    const [itemToDelete, setItemToDelete] = useState<{item: Item, type: ItemType} | null>(null);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode) return JSON.parse(savedMode);
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return true;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const fetchData = useCallback(async () => {
        if (!db) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const cardsCollection = collection(db, 'cards');
            const accountsCollection = collection(db, 'accounts');
            
            const [cardsSnapshot, accountsSnapshot] = await Promise.all([
                getDocs(cardsCollection),
                getDocs(accountsCollection),
            ]);

            const cardsList = cardsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as CardInfo[];
            const accountsList = accountsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as BankAccountInfo[];
            
            setCards(cardsList);
            setAccounts(accountsList);
            setError(null);
        } catch (e) {
            console.error("Error fetching data: ", e);
            setError("Failed to fetch data from Firestore. The service may be unavailable or configured incorrectly.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFormSubmit = async (data: Omit<CardInfo, 'id' | 'cardType'> | Omit<BankAccountInfo, 'id'>, type: ItemType) => {
        if (!db) {
            setError("Cannot save data: Firebase is not configured.");
            return;
        }
        const collectionName = type === 'card' ? 'cards' : 'accounts';

        const processedData = type === 'card'
            ? { ...data, cardType: getCardType((data as Omit<CardInfo, 'id' | 'cardType'>).cardNumber) }
            : data;

        try {
            if (itemToEdit) {
                await updateDoc(doc(db, collectionName, itemToEdit.id), processedData);
            } else {
                await addDoc(collection(db, collectionName), processedData);
            }
            fetchData();
        } catch(e) {
             console.error("Error submitting form: ", e);
             setError(`Failed to save ${type}.`);
        }
        
        setItemToEdit(null);
        type === 'card' ? setCardModalOpen(false) : setAccountModalOpen(false);
    };

    const openEditModal = (item: Item, type: ItemType) => {
        setItemToEdit(item);
        if (type === 'card') setCardModalOpen(true);
        else setAccountModalOpen(true);
    };

    const openAddModal = (type: ItemType) => {
        setItemToEdit(null);
        if (type === 'card') setCardModalOpen(true);
        else setAccountModalOpen(true);
    }
    
    const openDeleteModal = (item: Item, type: ItemType) => {
        setItemToDelete({item, type});
        setConfirmModalOpen(true);
    };
    
    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;
         if (!db) {
            setError("Cannot delete data: Firebase is not configured.");
            setConfirmModalOpen(false);
            setItemToDelete(null);
            return;
        }
        const {item, type} = itemToDelete;
        const collectionName = type === 'card' ? 'cards' : 'accounts';
        try {
            await deleteDoc(doc(db, collectionName, item.id));
            if (type === 'card') {
                setCards(prev => prev.filter(c => c.id !== item.id));
            } else {
                setAccounts(prev => prev.filter(a => a.id !== item.id));
            }
        } catch(e) {
            console.error("Error deleting item: ", e);
            setError(`Failed to delete ${type}.`);
        }
        setConfirmModalOpen(false);
        setItemToDelete(null);
    };

    const handleExport = () => {
        const dataToExport = {
            cards: cards,
            accounts: accounts,
        };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(dataToExport, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "A1-wallet-backup.json";
        link.click();
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            if (!db) {
                setError("Cannot import data: Firebase is not configured.");
                return;
            }
            try {
                const data = JSON.parse(e.target?.result as string);
                if (data.cards || data.accounts) {
                    setLoading(true);
                    const batch = writeBatch(db);
                    
                    data.cards?.forEach((card: Omit<CardInfo, 'id'>) => {
                         const docRef = doc(collection(db, "cards"));
                         batch.set(docRef, card);
                    });

                    data.accounts?.forEach((account: Omit<BankAccountInfo, 'id'>) => {
                        const docRef = doc(collection(db, "accounts"));
                        batch.set(docRef, account);
                    });

                    await batch.commit();
                    fetchData();
                }
            } catch (err) {
                console.error("Import failed", err);
                setError("Failed to import data. Please ensure it's a valid JSON file.");
            } finally {
                setLoading(false);
            }
        };
        reader.readAsText(file);
    };

    const renderContent = () => {
        if (loading) return <div className="text-center text-slate-400">Loading your wallet...</div>;
        if (error) return <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">{error}</div>;

        const items = activeView === 'cards' ? cards : accounts;
        const type = activeView === 'cards' ? 'card' : 'account';

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item, index) => (
                    <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        {activeView === 'cards' ? (
                            <CardComponent card={item as CardInfo} onEdit={() => openEditModal(item, type)} onDelete={() => openDeleteModal(item, type)} />
                        ) : (
                            <BankAccountComponent account={item as BankAccountInfo} onEdit={() => openEditModal(item, type)} onDelete={() => openDeleteModal(item, type)} />
                        )}
                    </div>
                ))}
                 <div className="animate-fade-in" style={{ animationDelay: `${items.length * 100}ms` }}>
                    <button
                        onClick={() => openAddModal(type)}
                        className="w-full max-w-sm h-56 rounded-xl border-2 border-dashed border-slate-400 dark:border-slate-600 text-slate-500 dark:text-slate-500 hover:border-cyan-400 hover:text-cyan-400 transition-all flex flex-col justify-center items-center group"
                    >
                        <PlusIcon className="w-16 h-16 transition-transform group-hover:scale-110" />
                        <span className="mt-2 text-lg font-semibold">Add New {activeView === 'cards' ? 'Card' : 'Account'}</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen text-slate-800 dark:text-white font-sans p-4 sm:p-8">
            <header className="flex justify-between items-center mb-12">
                <div className="text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 pb-2">A1 Wallet</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Your assets, managed with style and security.</p>
                </div>
                <button onClick={() => setSettingsModalOpen(true)} className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    <SettingsIcon className="w-6 h-6" />
                </button>
            </header>

            <main>
                <div className="flex justify-center mb-8 gap-4">
                    <button
                        onClick={() => setActiveView('cards')}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${activeView === 'cards' ? 'bg-cyan-500 text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                    >
                       <WalletIcon className="w-5 h-5"/> Cards
                    </button>
                    <button
                        onClick={() => setActiveView('accounts')}
                        className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${activeView === 'accounts' ? 'bg-cyan-500 text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                    >
                       <BankIcon className="w-5 h-5"/> Accounts
                    </button>
                </div>

                <div className="container mx-auto">
                    {renderContent()}
                </div>
            </main>
            
            <CardFormModal 
                isOpen={isCardModalOpen} 
                onClose={() => setCardModalOpen(false)} 
                onSubmit={(data) => handleFormSubmit(data, 'card')}
                initialData={itemToEdit as CardInfo | null}
            />
            <AccountFormModal 
                isOpen={isAccountModalOpen} 
                onClose={() => setAccountModalOpen(false)} 
                onSubmit={(data) => handleFormSubmit(data, 'account')} 
                initialData={itemToEdit as BankAccountInfo | null}
            />
            <SettingsModal 
                isOpen={isSettingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
                onExport={handleExport}
                onImport={handleImport}
            />
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={`Delete ${itemToDelete?.type || 'item'}`}
                message={`Are you sure you want to permanently delete this ${itemToDelete?.type}? This action cannot be undone.`}
            />
        </div>
    );
};

export default App;