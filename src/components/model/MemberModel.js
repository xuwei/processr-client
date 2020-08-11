export default class MemberModel {

    transactionIdentifier;
    employerName;
    employerABN;
    fundIdentifier;
    fundEmployerIdentifier;
    memberFirstName;
    memberOtherNames;
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
    postedBy;

    constructor(data) {
        Object.assign(this, data);
    }

    // add validation to fields here 
    isValid = ()=> {
        return true 
    }
}