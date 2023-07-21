import './App.scss';
import logo from "../src/assets/images/logo.png";
import man from "../src/assets/images/image 471.png";
import woman from "../src/assets/images/woman.png";
import promo from "../src/assets/images/textbg.png";
import {useState, useRef, useEffect} from 'react';
import emailjs from 'emailjs-com';
import check from "../src/assets/images/Check Square.png"

function App() {
    const [email, setEmail] = useState({value:"", error:""})
    const [isError, setError] = useState(null)
    const [testEmail, setTestEmail] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isVisible, setIsVisible] = useState(true);
    const [isFilled, setIsFilled] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isActiveButton, setIsActiveButton] = useState(false)
    const [height, setHeight] = useState(0)

    function validEmail(testEmail) {
        return /\S+@\S+\.\S+/.test(testEmail);
    }

    const handleChange = event => {
        if (!validEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }
        setTestEmail(event.target.value);
        setIsFilled(true)
    };

    console.log(isError, "error")

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])


    const isMobile = window.matchMedia("(max-width: 430px)").matches

    const listenToScroll = () => {
        let heightToHideFrom = 1200;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            "service_ul2cd1k",
            "template_qe0yh3k",
            form.current,
            "ciZ1GGzpsoHTRpwxi"
        )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        setIsSubmit(true)
    };
    const form = useRef()
    const handleSubmit = (event) => {
        event.preventDefault()
        let isError = false
        if(!/\S+@\S+\.\S+/.test(email.value)){
            setIsValidEmail(true)
            setEmail((current) => ({value: current.value, error: "Correct mistakes and try again"}) )
        }
        if(!email.value){
            setEmail({value:"", error: "Correct mistakes and try again"})
            isError = true;
            setIsValidEmail(false)
        }
        if(!isError){
            setEmail({value:"", error:""})
            setIsValidEmail(true)
        }
    }
    console.log(email, "email")
    return (
    <div className="App">
        <img src={man} className={'man'} alt={'man'}/>
        <img src={woman} className={'woman'} alt={'woman'}/>
        <header className="App-header">
        <img src={logo} alt={'logo'}/>
      </header>
      <body>
        <div className={'content-box'}>
            <h1 className={'poster'}>Your <b>Ultimate Dating</b> App </h1>
            <div className={'promo'}>
                <img src={promo} alt={'promo'}/>
                <h1 className={'promo-text'}>Exclusively tailored for Greek Life!</h1>
            </div>
        </div>
        {
            isMobile?
                <div className={'form-box'}>
                    <form className={'input-wrapper'} ref={form} onSubmit={handleSubmit}>
                        <input
                            placeholder={'Enter your email'}
                            name={"user_email"}
                            value={testEmail}
                            onChange={handleChange}
                            type={'text'}
                        />
                        <button className={'button'} onClick={sendEmail}>
                            <span>Join the wait list</span>
                        </button>
                    </form>
                    {
                        !isError && isFilled && isSubmit ?
                            <div className={'popUp'}>
                                <img src={check} alt={'check'}/>
                                <span>You’ve successfully subscribed</span>
                            </div>
                            :
                            null
                    }
                </div>
                :
                null
        }
      </body>
        {
            !isMobile ?
                <footer>
                    <form className={'input-wrapper'} ref={form} onSubmit={handleSubmit}>
                        <input
                            placeholder={'Enter your email'}
                            name={"user_email"}
                            value={testEmail}
                            onChange={handleChange}
                            type={'text'}
                        />
                        <button
                            className={'button'}
                            onClick={sendEmail}
                        >
                            <span>Join the wait list</span>
                        </button>
                    </form>
                    {
                        !isError && isFilled && isSubmit?
                            <div className={'popUp'}>
                                <img src={check} alt={'check'}/>
                                <span>You’ve successfully subscribed</span>
                            </div>
                            :
                            null
                    }
                </footer>
                : null
        }
    </div>
  );
}

export default App;
