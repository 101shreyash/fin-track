function UserInfo() {


    return <div style={{ marginTop: "5%", textAlign: "center" }}>

        <form>

            <p className="head-paragraph">Enter Your Fullname</p>
            <input style={{ height: "30px", width: "20%", paddingLeft: "30px", border: "none", color: "black" }} type="text" placeholder="Enter your fullname" />
            <p className="head-paragraph">Choose Your Default Currency Type</p>
            <p style={{fontSize : "20px"}}>Note : We are planning to add more codes in the future</p>
            <br /><br />
            <select className="select-currency">
                <option>USD</option>
                <option>NPR</option>
                <option>EUR</option>
                <option>AUD</option>
                <option>CAD</option>
                <option>INR</option>
            </select>

            <br /><br /><br />

            <button type="submit">Get Started</button>

        </form>
    </div>


}

export default UserInfo;