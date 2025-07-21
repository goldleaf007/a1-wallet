export enum CardType {
    VISA = 'Visa',
    MASTERCARD = 'Mastercard',
    AMEX = 'American Express',
    DISCOVER = 'Discover',
    UNKNOWN = 'Unknown'
}

export interface CardInfo {
    id: string;
    cardNumber: string;
    cardHolder: string;
    issueDate: string; // MM/YY
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardType: CardType;
    bankName: string;
}

export interface BankAccountInfo {
    id: string;
    bankName: string;
    branchName: string;
    accountHolder: string;
    accountNumber: string;
    routingNumber: string;
    accountType: string;
}
