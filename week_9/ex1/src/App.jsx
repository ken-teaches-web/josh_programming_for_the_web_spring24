import { useState } from 'react'
import './App.css'

function App() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    street: "",
    state: "",
    country: "United States",
    colors: []
  }
  function changeHandler(event) {
    console.log(event.target.value);
    if(event.target.name === "colors") {
        const colorName = event.target.id;
        if(formObject.colors.includes(colorName)) {
          setFormObject({
            ...formObject,
            colors: formObject.colors.filter
            ((color) => color !== colorName)
          })
        } else {
            setFormObject({
              ...formObject,
              colors: [...formObject.colors, colorName] 
            })
          } 
      } else {   
      formObject[""]
      setFormObject((previousForm) => {
      console.log(event.target.name)
        return {
        ...previousForm,
        [event.target.name]: event.target.value
        }
      })
    }}
  const [formObject, setFormObject] = useState(initialFormData);
  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted");
    console.log("the whole form object", formObject);
  }
  
  return (
    <>
      <h1>Alpaca Fan Club Registration</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Personal Information</legend>
            <div className="formgroup">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                id="firstName" 
                value={formObject.firstName}
                onChange={changeHandler} 
              />
          </div>
          <div className="formgroup">
            <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                id="lastName" 
                value={formObject.lastName}
                onChange={changeHandler} 
              />
          </div>
          <div className="formgroup">
            <label htmlFor="street">Street Address</label>
              <input 
                type="text" 
                name="street" 
                id="street" 
                value={formObject.street}
                onChange={changeHandler} 
              />
          </div>
          <div className="formgroup">
            <label htmlFor="state">State</label>
              <select 
                name="state" 
                id="state"
                value={formObject.state}
                onChange={changeHandler}
              >
                <option value="alaska">Alaska</option>
                <option value="arkansas">Arkansas</option> 
                <option value="arizona">Arizona</option>
                <option value="california">California</option>
                <option value="colorado">Colorado</option>
                <option value="minnesota">Minnesota</option>
              </select>  
          </div>
            <div className="formgroup">
              <label htmlFor="country">Country</label>
                <input 
                  type="text" 
                  name="country" 
                  id="country" 
                  value={formObject.country}
                  onChange={changeHandler} 
              />
          </div>
          
        </fieldset>
        <fieldset>
          <legend>Tell Us About Your Alpaca Interests!</legend>
          <p>Favorite Alpaca Colors</p>
          <div className="formgroup">
            <label htmlFor="brown">Brown
              <input
              type="checkbox"
              name="colors"
              id="brown"
              checked={formObject.colors.includes("brown")}
              onChange={changeHandler}
            />
            </label>
            <label htmlFor="black">Black
              <input
              type="checkbox"
              name="colors"
              id="black"
              checked={formObject.colors.includes("black")}
              onChange={changeHandler}
            />
            </label>
            <label htmlFor="pinto">Pinto
              <input
              type="checkbox"
              name="colors"
              id="pinto"
              checked={formObject.colors.includes("pinto")}
              onChange={changeHandler}
            />
            </label>
            <label htmlFor="cream">Cream
              <input
              type="checkbox"
              name="colors"
              id="cream"
              checked={formObject.colors.includes("cream")}
              onChange={changeHandler}
            />
            </label>
          </div> 
        </fieldset>
        <button type="submit">
          Sign Me Up!
        </button>  
      </form>
    </>
  )
}

export default App
