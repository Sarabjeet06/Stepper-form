export type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    fatherName: string,
    motherName: string,
    address: string,
    country: string,
    state: string,
}

export type PersonalData = {
    email: string;
    firstName: string,
    lastName: string,
    fatherName: string,
    motherName: string,
    phoneNumber: string,
}

type Address = {
    pinCode: string;
    streetName: string;
    city: string,
    country: string,
}

type ProfileInfo = {
    profileImageURL: string,
    fileURL: string,
}


export type FormData = PersonalData & {
    familyMembers: PersonalData[],
    address: Address,
    profileInfo: ProfileInfo,
}

//   type TypeUn=  Pick<PersonalDetails,'name'>
//   type TypeUrFinal = {name:string}

//   type Nested = {
//     a:{
//         b:{
//             c:string;
//             d:string;
//         }
//     }
//   }

//   type AB = Nested['a']['b']


// familyMembers.1.firstName