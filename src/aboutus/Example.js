import { useState } from 'react';
import './Example.css';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';
import accompany from './img/accompany.png';
import tried from './img/tried.png';
import idealreal from './img/idealreal.png';
import course from './img/course.png';

const Example = () => {

    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);

    const handlerModal1 = () => {
        setModal1(true);
    }

    const handlerModal2 = () => {
        setModal2(true);
    }

    const handlerModal3 = () => {
        setModal3(true);
    }

    const handlerModal4 = () => {
        setModal4(true);
    }

    return (
        <>
            <div className="background">

                <img src={process.env.PUBLIC_URL + '/KADA-back.png'} />

                <div className='shin-img' onClick={handlerModal1}>
                    <img src={process.env.PUBLIC_URL + './신윤복 월하정인.png'} />
                </div>
                {modal1 &&
                    <Modal1 setModal1={setModal1}>
                        <img src={accompany} alt="Overflow" style={{ borderRadius: '10%' }} />
                    </Modal1>
                }

                <div className='shin-img2' onClick={handlerModal2}>
                    <img src={process.env.PUBLIC_URL + './김홍도 씨름.png'} />
                </div>
                {modal2 &&
                    <Modal2 setModal2={setModal2}>
                        <img src={tried} alt="Overflow" style={{ borderRadius: '10%' }} />
                    </Modal2>
                }

                <div className='shin-img3' onClick={handlerModal3}>
                    <img src={process.env.PUBLIC_URL + './김홍도 그림감상.png'} />
                </div>
                {modal3 &&
                    <Modal3 setModal3={setModal3}>
                        <img src={course} alt="Overflow" style={{ borderRadius: '10%' }} />
                    </Modal3>
                }

                <div className='shin-img4' onClick={handlerModal4}>
                    <img src={process.env.PUBLIC_URL + './송하맹호도.png'} />
                </div>
                {modal4 &&
                    <Modal4 setModal4={setModal4}>
                        <img src={idealreal} alt="Overflow" style={{ borderRadius: '10%' }} />
                    </Modal4>
                }
            </div>

        </>
    )
}
export default Example;