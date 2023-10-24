const Footer = () => {
    return(
        <div className="w-full h-[10vh] border-2 bg-slate-100 p-2 flex justify-center items-center">
            <div className="flex flex-row space-x-2">
                <h1>Created by</h1>
                <a 
                    href="https://guillermodias.net.ar/"
                    target="_blank"
                    className="text-blue-500 hover:text-blue-800"
                >Guillermo David Dias</a>
            </div>
        </div>
    )
};

export default Footer;