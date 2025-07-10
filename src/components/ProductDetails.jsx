import {useParams} from "react-router-dom";

const ProjectDetails =()=>{
    const params = useParams();
    console.log(params.productId);
    return (
    <>
        <h1>Project Details</h1>
        <section>This is beautiful cotton shirt.</section>
        <h2>This is your product Id {params.productId}</h2>
    </>
    );
}
export default ProjectDetails;