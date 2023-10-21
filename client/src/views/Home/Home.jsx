import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { setPage } from "../../redux/pageSlice";
import InitBlog from "../../components/InitBlog/InitBlog";

const Home = () => {
    const pageSG = useSelector((state)=>state.page.page);
    const[content,setContent] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('en que pagina estoy: ', pageSG)
        switch (pageSG) {
            case 'InitBlog':
                setContent(<InitBlog/>);
                break;
        
            default:
                setContent(<InitBlog/>);
                break;
        }
    },[pageSG])

    useEffect(()=>{
        //?INICIA CON PAGINA -> InitBlog
        dispatch(setPage('InitBlog'));
    },[]);

    return(
        <>
            <div>
                <NavBar/>
            </div>
            <div>
                {content}
            </div>
            <div>
                <Footer/>
            </div>
        </>
    )
};
export default Home;