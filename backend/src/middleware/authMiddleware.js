
import jwt from "jsonwebtoken"


function authenticate(req,res,next) {
  
    const token = req.cookies.jwt
    

    if (!token) {

       return res.status(401).json({
            
            success : false,
            message: "Session Expired try to login Again"
        })
        
    }


    jwt.verify(token , process.env.JWTSECKEY , (err,decoded) => {

        if (err) {

          return res.status(401).json({
            
            success : false,
            message: "Could not verify the token try to login again"
        })
            
        }

        req.user = decoded;
        next();


    })
    
    
    
}


export default authenticate;