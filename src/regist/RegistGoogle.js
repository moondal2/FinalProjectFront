import { Button, TextField, Autocomplete } from "@mui/material";
import Frame from "../main/Frame";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegistGoogle = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, name } = state;
  const tempPwKey = 'TemporaryKey';

  const [nickName, setNickName] = useState('');
  const [nationIdx, setNationIdx] = useState(0);

  //[닉네임 핸들러]
  const handlerChangeNickname = (e) => {

    setNickName(e.target.value);
    console.log(nickName);
  }

  //[국가 핸들러]
  const handlerChangeNation = (newValue) => {
    const selectNation = nationsObj.filter(obj =>
      obj.nation == newValue
    )
    console.log(selectNation);
    setNationIdx(selectNation.nationIdx);
    console.log(nationIdx);
  }

  //[제출 핸들러]
  const handlerSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://${process.env.REACT_APP_JKS_IP}:8080/api/regist`,
      {
        "userId": email,
        "userPw": tempPwKey,
        "userName": name,
        "userNickname": nickName,
        "countryIdx": nationIdx
      })
      .then((response) => {
        console.log(response);
        //회원가입 후 로그인 페이지로 리다이렉트
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("버튼누름");
  }
  return (
    <Frame>
      <h2>회원가입</h2>
      <div id="logo-box">
        <Link to="/"><img src={process.env.PUBLIC_URL + '/KADA.png'} /></Link>
      </div>
      <div>
        <h2>추가 정보 입력</h2>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <TextField label={'NickName'} variant="standard" value={nickName} onChange={(e) => handlerChangeNickname(e)} />
          <Autocomplete
            disablePortal
            options={nationsArr}
            sx={{ width: 380 }}
            onInputChange={(e, newValue) => handlerChangeNation(newValue)}
            renderInput={(params) =>
              <TextField {...params} label='Country' />} />
          <Button type="submit" variant="contained">REGIST</Button>
        </form>
      </div>

      <div>
        <span>계정이 없으신가요?</span>
        <span>회원가입하기</span>
      </div>
      <div>
        <span>SNS 계정으로 로그인하기</span>
      </div>

    </Frame>
  )
}

export default RegistGoogle;

const nationsArr = [
  'korea'
]

const nationsObj = [
  {
    'nation': 'korea',
    'nationIdx': 1
  }
]