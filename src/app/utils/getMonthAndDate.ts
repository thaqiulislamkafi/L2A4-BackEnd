
export const getMonthAndDate = async(date:string)=>{

    const updatedDate = new Date(date) ;

    const year = updatedDate.getFullYear() ;
    const month = updatedDate.getMonth() + 1 ;

    return {
        year,
        month
    }
}