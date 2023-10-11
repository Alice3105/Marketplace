/*
The validation constraints, which are added to the user schema fields,
will throw error messages if they're violated when user data is saved to the database.
the getErrorMessage wil parse and return the error message associated with the 
specific validation error or other errors that can occur
*/

const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            //Execute the getUniqueErrorMessage whenever the err.code is between 1100 & 11001
            case 11000:
            case 11001:
                //To handle errors that are not thrown by a Mongoose
                //validator violation 
                message = getUniqueErrorMessage(err)
                break
            default:
            message = "Something went wrong"
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
            message = err.errors[errName].message
        }
    }
    return message
}

//The unique option is not a validator but a convenient helper
//for building MongoDB unique indexes
//Parse unique constraint
const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = 
        //Extract substring from error message
        //Find characters between ".$" and "_1"
        err.message.substring(err.message.lastIndexOf('.$') + 2,
        err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) +
        'aleady exists'
    } catch (ex) {
        output = "Unique field already exists"
    }
    return output
}

export default {getErrorMessage};