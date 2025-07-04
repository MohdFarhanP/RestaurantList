interface ErrorProp{
    errorMsg:string, 
}

const ErrorMessages = ({errorMsg}:ErrorProp)=> {
  return (
    <div>
        <div className="flex justify-center">
          <p className="text-red-600 font-medium">{errorMsg}</p>
        </div>
    </div>
  )
}
export default ErrorMessages;
