import styled from "styled-components";

const FooterDiv = styled.div`
position: fixed;
background-color: #81b29a;
color: white;
bottom: 0;
width: 100%;
height: 40px;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
& > a {
    cursor: pointer;
    text-decoration: none;
    color: #3d405b;
}
& > p {
    color: #3d405b;
}
`

function Footer() {


    return (
        <FooterDiv>
            <p>Jeffrey Kintner</p>
            <a href="https://github.com/jkintner25" target="_blank">Github</a>
            <a href='https://www.linkedin.com/in/jeffrey-kintner-9b503a71/' target="_blank">LinkedIn</a>
        </FooterDiv>
    );
};

export default Footer;
