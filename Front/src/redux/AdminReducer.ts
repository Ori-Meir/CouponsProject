import { Company } from "../Components/Models/Company";
import { Customer } from "../Components/Models/Customer";

export class AdminState {
    public allCompanies: Company[] = [];
    public company: Company = {
        id: 0,
        name: "",
        email: "",
        password: "",
        coupons: undefined
    }
    public allCustomers: Customer[] = [];

    public customer: Customer = {
        id: -1,
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
}

export enum AdminActionType {
    addCompany = "addCompany",
    addCustomer = "addCustomer",
    getAllCompanies = "getCompanies",
    getAllCustomers = "getCustomers",
    deleteCompany = "deleteCompany",
    deleteCustomer = "deleteCustomer",
    updateCompany = "updateCompany",
    updateCustomer = "updateCustomer",
    singleCompany = "singleCompany",
    singleCustomer = "singleCustomer",
}

export interface AdminAction {
    type: AdminActionType,
    payload?: any
}

export function addCompanyAction(newCompany: Company): AdminAction {
    return { type: AdminActionType.addCompany, payload: newCompany };
}

export function addCustomerAction(newCustomer: Customer): AdminAction {
    return { type: AdminActionType.addCustomer, payload: newCustomer };
}

export function deleteCompanyAction(id: number): AdminAction {
    return { type: AdminActionType.deleteCompany, payload: id };
}

export function deleteCustomerAction(id: number): AdminAction {
    return { type: AdminActionType.deleteCustomer, payload: id };
}

export function getAllCompaniesAction(companies: Company[]): AdminAction {
    return { type: AdminActionType.getAllCompanies, payload: companies };
}

export function getAllCustomersAction(customers: Customer[]): AdminAction {
    return { type: AdminActionType.getAllCustomers, payload: customers };
}

export function updateCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.updateCompany, payload: company };
}

export function updateCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.updateCustomer, payload: customer };
}
export function getSingleComapnyAction(company:Company): AdminAction {
    return{type: AdminActionType.singleCompany, payload:company};
}

export function getSingleCustomerAction(customer: Customer): AdminAction{
    return{type:AdminActionType.singleCustomer, payload:customer};
}

export function AdminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState };
    switch (action.type) {
        case AdminActionType.addCompany:
            newState.allCompanies = [...newState.allCompanies, action.payload];
            break;
        case AdminActionType.addCustomer:
            newState.allCustomers = [...newState.allCustomers, action.payload];
            break;
        case AdminActionType.deleteCompany:
            newState.allCompanies = [...newState.allCompanies].filter((item) => item.id !== action.payload);
            break;
        case AdminActionType.deleteCustomer:
            newState.allCustomers = [...newState.allCustomers].filter((item) => item.id !== action.payload);
            break;
        case AdminActionType.updateCompany:
            newState.allCompanies = newState.allCompanies.map((company) =>
                company.id === action.payload.id ? { ...company, ...action.payload } : company
            );
            break;
        case AdminActionType.updateCustomer:
            newState.allCustomers = [...newState.allCustomers].filter((item) => item.id !== action.payload);
            newState.allCustomers = [...newState.allCustomers, action.payload];
            break;
        case AdminActionType.getAllCompanies:
            newState.allCompanies = action.payload;
            break;
        case AdminActionType.getAllCustomers:
            newState.allCustomers = action.payload;
            break;
        case AdminActionType.singleCompany:
            newState.company = action.payload;
            break;
        case AdminActionType.singleCustomer:
            newState.customer = action.payload;
            break;
    }
    return newState
}