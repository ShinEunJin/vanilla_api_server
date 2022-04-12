let testState = 0

export const changeState = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    let data = { state: testState }
    try {
        setTimeout(() => {
            testState = 1
            return res.send("success")
        }, 5000)
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
}

export const checkState = async (req, res) => {
    res.setHeader('Access-Control-Allow-origin', 'http://127.0.0.1:5500')
    let data = { state: testState }
    try {
        console.log("check Data", data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }
}

export const resetState = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/')
    testState = 0
}