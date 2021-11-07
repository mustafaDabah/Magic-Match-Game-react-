import {useState , useEffect} from 'react'

function useSuccess(cards , num) {
    const [openModel , setOpenModel] = useState(false);

    useEffect(() => {
        const isMatch = cards.filter(card => card.match === true);
        if (isMatch.length === num ) {
          setOpenModel(true);
          console.log("susses");
        }
      } , [cards , num])

      return {openModel , setOpenModel}
}

export default useSuccess
