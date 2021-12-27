import { db } from "../firebase";

export const isCurrentUserAdmin = async(props)=> {
    props.setIsAdmin(false);
    if(props.currentUser){
      await db.collection("AdminEmails").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.id===props.currentUser.email){
                props.setIsAdmin(true);
            }
        });   
      });
    }
  }