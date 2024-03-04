import profilePic from './profilePic.png';
import './edit.css';

function ProFileEdit() {
    return (
        <div>
            <div className="content">
                <h1>ประวัติส่วนตัว</h1>
                <img src={profilePic} alt="profile" className='profilepic'/>
                <div className='form-control'>
                    <label>คำนำหน้า</label>
                    <input type="text" placeholder=""/>
                </div>
            </div>
        </div>
    )
}

export default ProFileEdit;