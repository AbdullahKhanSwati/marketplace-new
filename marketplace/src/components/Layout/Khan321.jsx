import React from 'react'
import Layout from './Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
const Khan321 = () => {

    const clearMemory = async()=>{
        try {
            const { data } = await axios.delete(`https://marketplace-new-84mw.vercel.app/api/v1/product/delete-many`);
            if (data.success) {
      
             toast.success(data.message);
              // console.log("total available products are",total);
            }
          } catch (error) {
            console.log(error);
          }
         

        
    }

    const delAllProducts =async ()=>{
        try {
            const { data } = await axios.delete(`https://marketplace-new-84mw.vercel.app/api/v1/product/delete-all`);
            if (data.success) {
      
             toast.success(data.message);
              // console.log("total available products are",total);
            }
          } catch (error) {
            console.log(error);
          }
    }
  return (
    
   <Layout>
    <>
    <div style={{marginTop:"200px",display:"flex" ,flexDirection:"row",justifyContent:"center" }}>
    <button
                    className="card-btn second-btn"
                    style={{
                      marginRight:"30px",
                      backgroundColor: "black",
                      color: "white",

                    }}
                    onClick={clearMemory}
                  >
                    check Status
                    </button>
                    <button
                    className="card-btn second-btn"
                    style={{
                    
                      backgroundColor: "black",
                      color: "white",

                    }}
                    onClick={delAllProducts}
                  >
                    delete All
                    </button>
    </div>
    </>

   </Layout>
  )
}

export default Khan321
