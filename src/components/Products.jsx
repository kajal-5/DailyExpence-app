import {Link} from "react-router-dom";

const Products =()=>{

    return (
        <>
            <h1>This is Products page.</h1>
            <section>
                <ul>
                    <li>
                        <Link to="/products/p1">Shirt</Link>
                    </li>
                    <li>
                        <Link to="/products/p2">jeans</Link>
                    </li>
                    <li>
                        <Link to="/products/p3">Jacket</Link>
                    </li>
                    <li>
                        <Link to="/products/p4">Tshirt</Link>
                    </li>
                </ul>

            </section>
        </>
    );

}

export default Products;