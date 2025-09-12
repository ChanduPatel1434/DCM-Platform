const Progress = () => {
    const enrollment=[]
    return <>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${enrollment?.progress}%` }}
            />
        </div></>
}
export default Progress
