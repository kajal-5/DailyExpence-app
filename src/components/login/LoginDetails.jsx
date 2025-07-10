import { useParams } from "react-router-dom"


const LoginDetails=()=>{

    const param = useParams();
    return (
        <>
            <h2>Hi welocome {param.student}! you are login in</h2>
        </>
    );
}

export default LoginDetails;