import StringUtil from "../util/StringUtil"

export default class RandomMemberModel {

    transactionIdentifier
    employerName
    employerABN
    fundIdentifier
    fundEmployerIdentifier
    memberFirstName
    memberLastName
    memberDateOfBirth
    memberGender
    memberAddress
    memberEmail
    memberContactNumber
    memberNumber
    memberTFN
    memberPayrollNumber
    memberEmploymentStatus
    memberFundRegistrationDate

    constructor() {
        this.transactionIdentifier = StringUtil.randomIntString(3)
        this.employerName = StringUtil.randomString(10)
        this.employerName = StringUtil.randomString(10)
        this.employerABN = StringUtil.randomString(10)
        this.fundIdentifier = StringUtil.randomString(10)
        this.fundEmployerIdentifier = StringUtil.randomString(10)
        this.memberFirstName = StringUtil.randomString(10)
        this.memberLastName = StringUtil.randomString(10)
        this.memberDateOfBirth = StringUtil.randomString(10)
        this.memberGender = StringUtil.randomString(10)
        this.memberAddress = StringUtil.randomString(10)
        this.memberEmail = StringUtil.randomString(10)
        this.memberContactNumber = StringUtil.randomString(10)
        this.memberNumber = StringUtil.randomString(10)
        this.memberTFN = StringUtil.randomString(10)
        this.memberPayrollNumber = StringUtil.randomString(10)
        this.memberEmploymentStatus = StringUtil.randomString(10)
        this.memberFundRegistrationDate = StringUtil.randomString(10)
    }

    isValid = ()=> {
        return true 
    }
}