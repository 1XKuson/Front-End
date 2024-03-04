import './Home.css';
import {  Navigate, useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate();

    const LinkSearch=() =>{
        navigate("/SearchProfile");
    }
    return(
        <>
            <div className="Header">
                <div className="logo-oriote">ORIOTE</div>
                <a href="/Login" className="login-btn">เข้าสู่ระบบ</a>
            </div>

            <div className="home-page">
                <div className="p-name">ระบบฐานข้อมูลอาจารย์</div>
                <div className="description">School Of Engineering, KMITL.</div>
                <div className="border"></div>
                <div className="btn">
                
                   <button className="search" onClick={LinkSearch}>ค้นหา</button>
        
                </div>
            </div>

            <div className="descip-page">
                <div className="topic">เกี่ยวกับ ระบบฐานข้อมูลอาจารย์</div>
                <div className="des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, sapiente laudantium. Perspiciatis voluptas autem vitae veniam similique incidunt quia temporibus.</div>
            </div>

            <div className="our-team">
                <div className="text">ผู้จัดทำ</div>
                <div className="content-container">
                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/3c/c9/a9/3cc9a953a237963764ca5365af1a5c04.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">กุศล ต๊ะ</div>
                                <div className="position">Back End Developer</div>
                            </divc>
                        </div>
                    </div>

                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/43/37/6b/43376b2090950df28ccacbd1c7f1bb79.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">ธนวัฒน์ รุ่งเลิศเกรียงไกร</div>
                                <div className="position">Back End Developer</div>
                            </divc>
                        </div>
                    </div>

                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/e3/c6/b4/e3c6b4e8d32eeb5e678fb16e37c6f9cb.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">เตชินท์ เอื้อจิระพงษ์พันธ์</div>
                                <div className="position">Back End Developer</div>
                            </divc>
                        </div>
                    </div>

                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/5c/97/0f/5c970fef739ee682d075a33b352b0d5d.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">พัสตราภรณ์ แต่งงาม</div>
                                <div className="position">Front End Developer | UX/UI Designer</div>
                            </divc>
                        </div>
                    </div>

                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/1b/c4/0f/1bc40f6b71d4407806862f4ac3541329.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">ธนดล อุ่นญาติ</div>
                                <div className="position">Front End Developer</div>
                            </divc>
                        </div>
                    </div>

                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/0a/01/c8/0a01c8449d7d8741e1a4aa18abd1673b.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">ธนภัทร วิลาสุวรรณ</div>
                                <div className="position">Front End Developer</div>
                            </divc>
                        </div>
                    </div>

                    <div className="member">
                        <div className="member-info">
                            <div className="member-img">
                                <img src='https://i.pinimg.com/originals/57/06/b5/5706b58bd67001b601b5277cfb486bc8.jpg' alt="" className='info-pic'/>
                            </div>
                            <divc className="info">
                                <div className="member-name">สืบสกุล โพนทอง</div>
                                <div className="position">Tester | Mockup Data</div>
                            </divc>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;