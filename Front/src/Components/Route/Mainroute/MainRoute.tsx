import { Route, Routes } from "react-router-dom";
import "./Mainroute.css";
import { Page404 } from "../../Pages/Page404/Page404";
import { AddCompany } from "../../Pages/AdminPages/AddCompany/AddCompany";


import { AllCompanies } from "../../Pages/AdminPages/AllCompanies/AllCompanies";
import { AddCustomer } from "../../Pages/AdminPages/AddCustomer/AddCustomer";
import { UpdateCustomer } from "../../Pages/AdminPages/UpdateCustomer/UpdateCustomer";
import { DeleteCustomer } from "../../Pages/AdminPages/DeleteCustomer/DeleteCustomer";
import { AllCustomers } from "../../Pages/AdminPages/AllCustomers/AllCustomers";
import { CompanyAdded } from "../../TransferPages/CompanyAdded/CompanyAdded";
import { CustomerAdded } from "../../TransferPages/CustomerAdded/CustomerAdded";
import { ViewCompany } from "../../Pages/AdminPages/ViewCompany/ViewCompany";
import { ViewCustomer } from "../../Pages/AdminPages/ViewCustomer/ViewCustomer";
import { Register } from "../../Pages/Register/Register";
import { CompanyDeleted } from "../../TransferPages/CompanyDeleted/CompanyDeleted";
import { DeleteCompany } from "../../Pages/AdminPages/DeleteCompany/DeleteCompany";
import { Login } from "../../Pages/Login/Login";
import { AllCoupons } from "../../Pages/GuestPages/AllCoupons/AllCoupons";
import { AddCoupon } from "../../Pages/CompanyPages/AddCoupon/AddCoupon";
import { UpdateCoupon } from "../../Pages/CompanyPages/UpdateCoupon/UpdateCoupon";
import { DeleteCoupon } from "../../Pages/CompanyPages/DeleteCoupon/DeleteCoupon";
import { CompanyCoupons } from "../../Pages/CompanyPages/CompanyCoupons/CompanyCoupons";
import { CompanyCouponsMaxPrice } from "../../Pages/CompanyPages/CompanyCouponsMaxPrice/CompanyCouponsMaxPrice";
import UpdateCompany from "../../Pages/AdminPages/UpdateCompany/UpdateCompany";
import { ViewCoupon } from "../../Pages/GuestPages/viewCoupon/viewCoupon";
import { CompanyCouponsCategory } from "../../Pages/CompanyPages/CompanyCouponsCategory/CompanyCouponsCategory";
import { PurchaseCoupon } from "../../Pages/CustomerPages/PurchaseCoupon/PurchaseCoupon";
import { CustomersCoupons } from "../../Pages/CustomerPages/CustomersCoupons/CustomersCoupons";
import { CustomersCouponsCategory } from "../../Pages/CustomerPages/CustomersCouponsCategory/CustomersCouponsCategory";
import { CustomersCouponsMaxPrice } from "../../Pages/CustomerPages/CustomersCouponsMaxPrice/CustomersCouponsMaxPrice";
import { CustomerDetails } from "../../Pages/CustomerPages/CustomerDetails/CustomerDetails";
import { CompanyDetails } from "../../Pages/CompanyPages/CompanyDetails/CompanyDetails";


export function Mainroute(): JSX.Element {
    return (
        <div className="Mainroute">
            <Routes>
                <Route path="/" element={<AllCoupons />} />
                <Route path="/addCompany" element={<AddCompany />} />
                <Route path="/updateCompany/:id" element={<UpdateCompany />} />
                <Route path="/deleteCompany/:id" element={<DeleteCompany />} />
                <Route path="/allCompanies" element={<AllCompanies />} />
                <Route path="/viewCompany/:id" element={<ViewCompany />} />
                <Route path="viewCustomer/:id" element={<ViewCustomer />} />
                <Route path="/addCustomer" element={<AddCustomer />} />
                <Route path="/updateCustomer/:id" element={<UpdateCustomer />} />
                <Route path="/deleteCustomer/:id" element={<DeleteCustomer />} />
                <Route path="/allCustomers" element={<AllCustomers />} />
                <Route path="/singleCustomer" element={<ViewCustomer />} />
                <Route path="/companyAdded" element={<CompanyAdded />} />
                <Route path="/companyDeleted" element={<CompanyDeleted />} />
                <Route path="/customerAdded" element={<CustomerAdded />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/allCoupons" element={<AllCoupons />} />
                <Route path="/viewCoupon/:id" element={<ViewCoupon />} />
                <Route path="/addCoupon" element={<AddCoupon />} />
                <Route path="/updateCoupon/:id" element={<UpdateCoupon />} />
                <Route path="/deleteCoupon" element={<DeleteCoupon />} />
                <Route path="/companyCoupons/:id" element={<CompanyCoupons />} />
                <Route path="/companyCouponCategory" element={<CompanyCouponsCategory />} />
                <Route path="/companyCouponsPrice" element={<CompanyCouponsMaxPrice />} />
                <Route path="/viewCompany/:id" element={<ViewCompany />} />
                <Route path="companyDetails" element={<CompanyDetails />} />
                <Route path="/purchaseCoupon/:id" element={<PurchaseCoupon />} />
                <Route path="/customerCoupons" element={<CustomersCoupons />} />
                <Route path="/customerCouponsCategory" element={<CustomersCouponsCategory />} />
                <Route path="/customerCouponsPrice" element={<CustomersCouponsMaxPrice />} />
                <Route path="viewCustomer/:id" element={<ViewCustomer />} />
                <Route path="customerDetails" element={<CustomerDetails />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
