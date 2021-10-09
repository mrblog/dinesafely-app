class ScoreApi {
    resError = (res) => {
        let msg = (res.statusText ? res.statusText : "Unspecified error") + " (" + res.status + ")"
        console.log(msg)
        return msg
    }

    dataError = (data) => {
        let message = "Unknown error"
        if (data.error) {
            console.log(data.error)
            message = data.error
        }
        return message;
    }

    scoreApi = (method, endpoint, props) => {
        // props: authToken, successProp, params, successHandler
        const dataError = this.dataError
        const resError = this.resError
        return new Promise(function (resolve, reject) {

            console.log("process.env.API_URL="+process.env.REACT_APP_API_URL)
            let url = process.env.REACT_APP_API_URL + endpoint
            let headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            let requestInfo = {
                method: method,
                headers: headers
            }
            if (props.params) {
                requestInfo.body = JSON.stringify(props.params)
            }

            fetch(url, requestInfo).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        console.log(data)
                        if (data.success) {
                            if (data.data) {
                                resolve(data.data)
                            } else {
                                resolve()
                            }
                        } else {
                            reject(new Error(dataError(data)))
                        }
                    })
                } else {
                    reject(new Error(resError(res)))
                }
            }).catch((err) => {
                console.log(err)
                reject(err)
            })

        })
    }

    placesNearby = (lat, lng) => {
        return this.scoreApi("GET", "/places/nearby?location=" + encodeURI(lat + "," + lng), {})
    }

    findPlaces = (lat, lng, input) => {
        return this.scoreApi("GET", "/places/find?location=" + encodeURI(lat + "," + lng)+"&input="+input, {})
    }

    getCities = (textInput) => {
        return this.scoreApi("GET", "/cities?q=" + encodeURI(textInput), {})
    }

    postScore = (email, handle, place_id, name, staff_masks, customer_masks, outdoor_seating, vaccine, rating, notes, is_affiliated) => {
        const score = {
            email: email,
            handle: handle,
            place_id: place_id,
            name: name,
            staff_masks: staff_masks,
            customer_masks: customer_masks,
            outdoor_seating: outdoor_seating,
            vaccine: vaccine,
            rating: rating,
            notes: notes,
            is_affiliated: is_affiliated
        }
        return this.scoreApi("POST", "/place/score", {params: score})
    }

    confirmScore = (token) => {
        return this.scoreApi("PUT", "/place/score/token/"+token, {})
    }
}

export default ScoreApi