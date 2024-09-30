import React, {useState} from "react";
import axios from 'axios';
import styled from "styled-components";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [userId, setUserId] = useState("");
  const [idMessage, setIdMessage]= useState("");
  const [isId, setIsId] = useState(false);

  const [password, setPassword] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isPW, setIsPW] = useState(false);

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmail, setIsEmail] = useState(true);

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setUserId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
 
    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      setIsId(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPwMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPW(false);
    } else {
      setPwMessage("안전한 비밀번호 입니다.");
      setIsPW(true);
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
 
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };



  const handleSignin = async () => {
    if (!isId) {
      alert("아이디를 올바르게 입력해주세요.");
      return;
    }
    
    if (!isPW) {
      alert("비밀번호를 올바르게 입력해주세요.");
      return;
    }

    const url = `${BASE_URL}/api/user/signup`
    const requestData = {
      userId: userId,
      password: password,
      email: email
    };

    try{
      const response = await axios.post(
        url,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200){
        alert("회원가입이 완료되었습니다.");
      }

    } catch(error){
      console.error("Error response:", error.response);
      
      if (error.response.status === 401){
        alert("이미 사용중인 아이디입니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }

    }
  };
  
  const handelLogin = async () => {
    const url = `${BASE_URL}/api/user/login`
    const requestData = {
      userId: userId,
      password: password
    };

    try{
      const response = await axios.post(
        url,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200){
        console.log("사용자 고유 id:",response.data)
        alert(`로그인 성공, 사용자 고유 id: ${response.data} `)
      }

    } catch (error) {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요")
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Wrapper>
        <IdInput 
          placeholder = {"아이디(필수)"}
          value = {userId}
          onChange = {onChangeId}
        />
        <IdMsg>{idMessage}</IdMsg>
        <PasswordInput
          placeholder={"비밀번호(필수)"}
          value = {password}
          onChange = {onChangePassword}
        />
        <PwMsg>{pwMessage}</PwMsg>
        <EmailInput
          placeholder={"이메일(선택)"}
          value = {email}
          onChange = {onChangeEmail}
        />
        <EmailMsg>{emailMessage}</EmailMsg>
        
      </Wrapper>
      <Sign onClick={handleSignin}> 회원가입 완료 </Sign>

      <Title>로그인</Title>
      <Wrapper>
        <IdInput
          placeholder= { "아이디 "}
          value={loginId}
          onChange= {(e) => setLoginId(e.target.value)}
        />
        <PasswordInput
          placeholder= {"비밀번호"}
          value={loginPw}
          onChange={(e) => setLoginPw(e.target.value)}
        />
      </Wrapper>
      <Sign onClick={handelLogin}> 로그인 완료 </Sign>
    </Container>
  );
}
export default App;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;  
  width: 100vw;   
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-top: 15rem;
  margin-bottom: 4rem;

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%; 
  justify-content: center;
  align-items: center;
`;

const IdInput = styled.input`
  width:20rem;
  height:5rem;
  margin-bottom: 1rem;
  border:0.3rem solid;
  border-color: lightgray;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
`;

const PasswordInput = styled.input`
  width: 20rem;
  height: 5rem;
  margin-bottom: 1rem;
  border: 0.3rem solid;
  border-color: lightgray;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
`;

const EmailInput = styled.input`
  width: 20rem;
  height: 5rem;
  margin-bottom: 1rem;
  border: 0.3rem solid;
  border-color: lightgray;
  border-radius: 1.5rem;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
`;

const IdMsg = styled.div`
  font-size: 1.5rem;
  font-color: lightgray;
    margin-bottom: 1rem;
`

const PwMsg = styled.div`
  font-size: 1.5rem;
  font-color: lightgray;
    margin-bottom: 1rem;
`

const EmailMsg = styled.div`
  font-size: 1.5rem;
  font-color: lightgray;
`

const Sign = styled.button`
  width: 20rem;
  height: 5rem;
  border-radius: 1.5rem;
  font-size: 2rem;
  margin-top: 1rem;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  &:hover {
  background-color: #45a049;
  }

`