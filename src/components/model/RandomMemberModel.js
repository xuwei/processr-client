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
    postedBy

    constructor() {
        this.transactionIdentifier = StringUtil.randomIntString(3)
        this.employerName = StringUtil.randomString(10)
        this.employerABN = StringUtil.randomIntString(10)
        this.fundIdentifier = StringUtil.randomIntString(10)
        this.fundEmployerIdentifier = StringUtil.randomIntString(10)
        this.memberFirstName = StringUtil.randomString(10)
        this.memberOtherNames = StringUtil.randomString(10)
        this.memberLastName = StringUtil.randomString(10)
        this.memberDateOfBirth = "25/10/1980"
        this.memberGender = "Male"
        this.memberAddress = StringUtil.randomString(10)
        this.memberEmail = "email.xuwei@gmail.com"
        this.memberContactNumber = StringUtil.randomString(10)
        this.memberNumber = StringUtil.randomString(10)
        this.memberTFN = StringUtil.randomString(10)
        this.memberPayrollNumber = StringUtil.randomString(10)
        this.memberEmploymentStatus = "Fulltime"
        this.memberFundRegistrationDate = "25/10/1980"
        this.posted = "email.xuwei@gmail.com"
    }

    isValid = ()=> {
        return true 
    }
}