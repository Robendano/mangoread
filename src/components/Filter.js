import React, {useEffect, useState} from 'react';
import "../App.css"
import "./checkbox.css"
import styled from "styled-components";
import ChevronRight from "../images/Vector 2.svg"
import Line from "../images/Line 13.svg"
import Back from "../images/Vector 2 (1).svg"
import axios from "axios";
import ItemGenre from "../UI/ItemGenre";
import {useDispatch, useSelector} from "react-redux";
import {showGenre, setTypes, setAfters, setBefores, updateAction, setGenre} from "../store/widgetSlice";
import {Label} from "@mui/icons-material";
const Container = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  width: 400px;
  height: 770px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box; 
`;
const Input = styled.input`
  margin: 0;
  width: 35px;
  height: 35px;
 
`;
const DateInput = styled.input`
  width: 168px;
  height: 55px;
  border: 2px solid #2FE09B;
  border-radius: 8px;
  outline: none;
  font-size: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 15px;
  gap: 10px;
;
`;
const Item = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const P = styled.text`
  font-size: 24px;
  margin-left: 10px;
  
`;
const AddReset = styled.div`
  margin-bottom: 10px;
`;
const ButtonReset = styled.button`
  font-family: Montserrat;
  cursor: pointer;
  width: 174px;
  height: 52px;
  background-color: #C94CEE;
  font-size: 16px;
  font-weight: lighter;
  color: white;
  border: none;
  border-radius: 8px;
  outline: none;

  :active {
    background: #b959dc;
  }
`;
const ButtonApply = styled.button`
  font-family: Montserrat;
  cursor: pointer;
  width: 174px;
  height: 52px;
  background-color: #AD02E0;
  font-size: 16px;
  font-weight: lighter;
  color: white;
  border: none;
  border-radius: 8px;
  outline: none;

  :active {
    background: #9603c2;
  }
`;
const Genre = styled.div`
  height: 630px;
  overflow-y: scroll;
  
  ::-webkit-scrollbar {
    width: 11px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    right: -10px;
    background: #c0c0c0;
    border-radius: 25px;
  }
`;

const Filter = () => {
    const [types,setType] = useState('')
    const [dataGenre,setDataGenre]=useState([])
    const [before,setBefore]=useState(0)
    const [after,setAfter]=useState(2022)


    const dispatch = useDispatch()
    const {filterGenre} = useSelector(state=>state.widget)
    const {type}=useSelector(state=>state.widget)

    useEffect(()=>{
        const fetchGenre = async ()=>{
            const res = await axios.get('http://134.122.75.14:8666/api/v1/genre')
            setDataGenre(res.data)
        }
        fetchGenre()

    },[type])
    const submitFilter = () => {
      dispatch(setTypes(types))
      dispatch(setAfters(after))
      dispatch(setBefores(before))
      dispatch(updateAction(true))
    }
    const clearFilter=()=>{
        dispatch(setTypes(''))
        dispatch(setAfters(2022))
        dispatch(setBefores(0))
        dispatch(updateAction(false))
        dispatch(setGenre(''))
        setType('')
        setAfter(2022)
        setBefore(0)
    }

    const handleInput =(e)=>{
        if(types===e.target.value){
            setType('')
        }else {
            setType(e.target.value)
        }
    }
    const handleClick = ()=>{
        dispatch(showGenre(true))
    }
    const handleClick2 = ()=>{
        dispatch(showGenre(false))
    }


    return (
        <Container>
            {filterGenre
                    ?
                    <div style={{paddingTop: "20px", height: "35px"}}>
                        <div style={{display: "flex", userSelect: "none"}}>
                            <img style={{cursor:"pointer"}} onClick={handleClick2} src={Back}/>
                            <p style={{fontSize: "24px", color: "#878787", margin: "0 0 0 10px"}}>Назад</p>
                        </div>
                        <Genre style={{marginTop: "17.5px"}}>
                            <P style={{fontSize: "35px"}}>Жанры</P>
                            {dataGenre.map((g) => <ItemGenre genre={g}/>)}
                        </Genre>
                    </div>
                    : <div>
                        <div
                             style={{display: "flex", justifyContent: "space-between"}}>
                            <p style={{fontSize: "24px"}}>Жанры</p>
                            <div style={{fontSize: "24px", color: "#878787", alignItems: "center", display: "flex"}}>
                                все
                                <img onClick={handleClick} style={{marginLeft: "17px",cursor:"pointer"}} src={ChevronRight}/>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <p style={{fontSize: "24px", height: "20px"}}>Тип</p>
                            <label style={{marginBottom:"10px"}}>
                                <div style={{display:"flex"}}>
                                    <input

                                        checked={types === 'Манга'}
                                        onClick={handleInput}
                                        id="checkbox"
                                        value={'Манга'}
                                        type={'checkbox'}/>
                                    <span></span>
                                    <P>Манга</P>
                                </div>
                            </label>

                            <label style={{marginBottom:"10px"}}>
                                <div style={{display:"flex"}}>
                                    <input
                                        checked={types === 'Манхва'}
                                        onClick={handleInput}
                                        value={'Манхва'}
                                        id="checkbox" type={'checkbox'}/>
                                    <span></span>
                                    <P>Манхва</P>
                                </div>
                            </label>

                            <label style={{marginBottom:"10px"}}>
                                <div style={{display:"flex"}}>
                                    <input
                                        checked={types === 'Комиксы'}
                                        onClick={handleInput}
                                        value={'Комиксы'}
                                        id="checkbox" type={'checkbox'}/>
                                    <span></span>
                                    <P>Комиксы</P>
                                </div>
                            </label>

                            <label style={{marginBottom:"10px"}}>
                                <div style={{display:"flex"}}>
                                    <input
                                        checked={types === 'Маньхуа'}
                                        onClick={handleInput}
                                        value={'Маньхуа'}
                                        id="checkbox" type={'checkbox'}/>
                                    <span></span>
                                    <P>Маньхуа</P>
                                </div>
                            </label>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginTop: "33px"}}>
                            <DateInput value={before} onChange={(e)=>setBefore(e.target.value)} type={"number"} placeholder={"От 0"}/>
                            <img src={Line}/>
                            <DateInput value={after} onChange={(e)=>setAfter(e.target.value)}type={"number"} placeholder={"До 2022"}/>
                        </div>
                    </div>}


            <AddReset style={{display:"flex",justifyContent:"space-between"}}>
                <ButtonReset onClick={clearFilter}>сбросить</ButtonReset>
                <ButtonApply onClick={submitFilter}>применить</ButtonApply>
            </AddReset>
        </Container>
    );
};

export default Filter;