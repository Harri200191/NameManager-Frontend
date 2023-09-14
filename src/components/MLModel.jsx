import React from 'react'

const MLModel = () => {
  return (
    <div>
        <form>
            <textarea id="inputText" placeholder='Add the text that you want to summarize...' name="inputText" rows="15" cols="60"></textarea>
            <br/>
            <br/>
            <input className='--butt' type="button" value="Submit" onclick="processInput()" />
        </form>

        <br/>
        <hr/>
    </div>
  )
}

export default MLModel;