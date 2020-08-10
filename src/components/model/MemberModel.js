export default class MemberModel {

    transactionIdentifier;
    employerName;
    employerABN;
    fundIdentifier;
    fundEmployerIdentifier;
    memberFirstName;
    memberLastName;
    memberDateOfBirth;
    memberGender;
    memberAddress;
    memberEmail;
    memberContactNumber;
    memberNumber;
    memberTFN;
    memberPayrollNumber;
    memberEmploymentStatus;
    memberFundRegistrationDate;

    constructor(data) {
        Object.assign(this, data);
    }

    // add validation to fields here 
    isValid = ()=> {
        return true 
    }
}