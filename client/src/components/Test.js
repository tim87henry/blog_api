import axios from 'axios';

const Test = () => {
    const gg = () => {
        let data=[];
        axios.get("http://localhost:5000/users")
        .then(res => {
        res.data.map((val) => {
            data.push(val.first_name)
        })
        console.log("Names are "+data)
        }).catch(err => {
        console.log(err)
        })
    }
    return(
        <div>
            Yup, it's showing up
            <button onClick={gg}>Go ahead</button>  
        </div>
    )
};

export default Test;