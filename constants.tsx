import React from 'react';

export const INITIAL_CARDS = [];
export const INITIAL_ACCOUNTS = [];

export const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const WalletIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const BankIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 11l-.54-1.591A6.001 6.001 0 0112 4.004a6.001 6.001 0 014.803 5.405L16.263 11" />
    </svg>
);

export const CardChipIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5.625 1.5H9a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V3h-1.875a.75.75 0 010-1.5zM15 .75a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V3h-1.875a.75.75 0 010-1.5H15zM4.875 9.75a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H6.375v1.875a.75.75 0 01-1.5 0V9.75zm13.5 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5h-3v1.875a.75.75 0 01-1.5 0V9.75zM15 15.75a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V18h-1.875a.75.75 0 010-1.5H15zM4.875 16.5a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H6.375V19.5a.75.75 0 01-1.5 0v-3zM9.75 9h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5A.75.75 0 019.75 9z" clipRule="evenodd" />
    </svg>
);

export const WifiIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12.55a11 11 0 0 1 14 0"></path>
    <path d="M8.5 16a6.5 6.5 0 0 1 7 0"></path>
    <path d="M12 19.5a2.5 2.5 0 0 1 0 0"></path>
  </svg>
);

export const VisaIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 121.2" fill="#fff"><path d="M372.2 115.3l11.8-114H296l-14.4 89.2-2.3-11.8c-2.3-12.1-12-32.3-27.1-42.2-10.4-6.8-23.3-10.7-37.4-10.7-47.3 0-82.6 28.5-82.9 67.5-.2 27.6 20.2 43.1 36.3 50.8 17.1 8.2 23.3 12.6 23.3 19.3 0 9.8-10.6 14.2-21.2 14.2-15.6 0-24.9-3.7-33.8-8.2l-6.2 26.5c8.9 4.7 23.5 7.6 39.3 7.6 51.3 0 85.2-27.6 85.5-70.3.2-22-14.9-37.4-34-46.7-14.9-7-25.1-11.8-25.1-19.1 0-7.2 7.7-12.7 19.8-12.7 14.1 0 22.9 4.5 29.5 8.1l5.5-24.4c-7.7-3.4-18.4-6-32-6-44.1 0-75.1 26.6-75.1 63.5 0 30.3 25.1 46.5 47.2 57.2 16.7 8.2 20.7 14.2 20.7 22.3 0 13.9-15.1 17.6-26.6 17.6-20.9 0-36.8-7.2-36.8-7.2L0 1.3h71.8l29.5 114h80.3l46.2-114h69.1l-14.7 114z"/></svg>
);

export const MastercardIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 62.5" fill="none">
        <circle cx="31.25" cy="31.25" r="31.25" fill="#EA001B"/>
        <circle cx="68.75" cy="31.25" r="31.25" fill="#F79E1B"/>
        <path d="M57.97 31.25c0 14.75-8.2 27.4-19.85 33.3-2.6-1.7-4.9-3.9-6.9-6.3-4-5.1-6.2-11.5-6.2-18.3 0-8.8 3.5-16.7 9.2-22.4 2-2.1 4.3-3.8 6.9-5.1 11.6 5.8 19.85 18.5 19.85 33.3z" fill="#FF5F00"/>
    </svg>
);

export const AmexIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#006FCF">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
        <path d="M11.33 12.5h1.34v-1h-1.34v1zm-1.67 0h1.34v-1H9.66v1zm3.34 0h1.34v-1h-1.34v1z" fill="#fff"/>
        <rect x="4" y="14" width="6" height="2" fill="#fff"/>
    </svg>
);

export const SettingsIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.127c-.331.183-.581.495-.644.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.127.331-.183.581-.495.644-.87l.213-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const TrashIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201l-1.21.09c-.37.022-.72.155-1.012.369l-2.086.94c-.37.166-.751.22-1.124.141l-2.087-.466c-.373-.083-.699-.126-1.03-.126H5.09c-1.18 0-2.134.91-2.201 2.09l-.09 1.21c-.022.37-.155.72-.369 1.012l-.94 2.086c-.166.37-.22.751-.141 1.124l.466 2.087c.083.373.126.699.126 1.03v.916c0 1.18.91 2.134 2.09 2.201l1.21-.09c.37-.022.72-.155 1.012-.369l2.086-.94c.37-.166.751-.22 1.124-.141l2.087.466c.373.083.699.126 1.03.126h5.09c1.18 0 2.134-.91 2.201-2.09l.09-1.21c.022-.37.155-.72.369-1.012l.94-2.086c.166-.37.22-.751-.141-1.124l-.466-2.087c-.083-.373-.126-.699-.126-1.03z" />
    </svg>
);

export const PencilIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

export const UploadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);
