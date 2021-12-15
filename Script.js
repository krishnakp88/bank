
class Bank {
    validateAccNumber(acno) {
        return acno in localStorage ? true : false
    }

    registerAccount() {
        let full_name = fname.value;
        let account_type = acctype.value;
        let account_number = accnmbr.value;
        let emailId = Email.value;
        let phone_number = phnmbr.value;
        let pswrd = Password.value;
        let balance = 2000;

        let accountDetail = {
            full_name, account_type, account_number, emailId, phone_number, pswrd, balance
        }
        if (this.validateAccNumber(account_number)) {

            swal("Failed!", "Account Number already exist!", "error");
        }
        else {
            localStorage.setItem(account_number, JSON.stringify(accountDetail))
            alert(`Account with A/c No: ${account_number} is registered successfully`)
            window.location.href = "./index.html", true
        }
    }
    authenticate(accno, pwd) {
        if (this.validateAccNumber(accno)) {
            let user = JSON.parse(localStorage.getItem(accno))
            if (user.pswrd == pwd) {
                return 1;//login success
            }
            else {
                return 0;//invalid password
            }
        }
        else {
            return -1//invalid account number
        }
    }
    login() {
        let UserAccountNumber = usr_accnmbr.value;
        let UserPassword = usr_pswd.value
        let user = this.authenticate(UserAccountNumber, UserPassword)
        console.log(user);
        if (user === 1) {
            sessionStorage.setItem("user", UserAccountNumber)
            alert("Login Success,Welcome to Federal Bank!")
            window.location.href = "./home.html", true
        } else {
            swal("Failed!", "Login Failed", "error");
        }

    }
    logout() {
        if ("user" in sessionStorage) {
            sessionStorage.removeItem("user")
            window.location.href = "./index.html"
        }
        else {
            alert("Invalid session you must login first")
        }
    }

    getUser() {
        let user = sessionStorage.getItem("user")
        let element=document.createElement("div")
        element.innerHTML=`<h1>Welcome User: ${user}</h1>`
        document.querySelector("#section").append(element)
    }
    getUserDataFromLocalStorage(acno) {
        return JSON.parse(localStorage.getItem(acno))
    }
    balanceEnquiry() {
        let loggedUser = sessionStorage.getItem("user")
        let loggedUserData = this.getUserDataFromLocalStorage(loggedUser)
        let bal=loggedUserData.balance
        return bal
        // alert(`Your Updated balance is ${bal}`)
        // console.log(loggedUserData.balance);
    }

    fundTransfer() {
        let payee_acno = sessionStorage.getItem("user")
        let to_accountNo = to_acno.value;
        let confirm_accountNo = confirm_acno.value;
        let fund = Number(amount.value);
        if (to_accountNo == confirm_accountNo) {
            if (this.validateAccNumber(to_accountNo)) {
                let avail_blnce = this.balanceEnquiry()
                if (fund > avail_blnce) {
                    alert("Insufficient balance")
                }
                else {
                    let payee_detail = this.getUserDataFromLocalStorage(payee_acno)
                    let to_acno_detail = this.getUserDataFromLocalStorage(to_accountNo)
                    let bal = avail_blnce - fund
                    payee_detail.balance = bal
                    localStorage.setItem(payee_acno,JSON.stringify(payee_detail))
                    alert(`Account debited with amount ${fund} successfully`)
                    window.location.href = "./home.html"


                    let to_currentBalance = Number(to_acno_detail.balance)
                    to_currentBalance += fund
                    to_acno_detail.balance = to_currentBalance
                    localStorage.setItem(to_accountNo,JSON.stringify(to_acno_detail))

                }
            }
            else {
                alert("Invalid to_account number")
            }
        }
        else {
            alert("Account number mismatch")
        }
    }
}
var bank = new Bank();
