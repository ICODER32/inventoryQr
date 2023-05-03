import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import './QrScanner.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class QrScanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delay: 100,
            result: 'No result',
            shown: false,
            item_name: "",
            user_id: localStorage.getItem("user_id")
        }

        this.handleScan = this.handleScan.bind(this)
    }

    addtodatabase = async (name) => {
        try {
            const data = await axios.post('/api/items/sold', {
                name, user_id: this.state.user_id
            })
            console.log(data)
            toast.success("Item Scanned!");
        } catch (error) {
            toast.error('Data Duplicate')
        }


    }
    handleScan(data) {
        try {
            if (data) {
                this.setState({
                    result: data,
                    shown: false
                })
                const item_details = JSON.parse(data.text)


                this.addtodatabase(item_details.name)

            }
        } catch (error) {
            toast.error("This QR code is not acceptable!");
            console.log(error)

        }

    }
    handleError(err) {
        console.error(err)
    }
    render() {
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return (
            <>
                <h2 className='main_title'>Scan Item's QR code</h2>
                <button className='scan-btn' onClick={() => this.setState({ shown: !this.state.shown })}>{this.state.shown ? <i className="fa fa-times" aria-hidden="true"></i> : <i className="fa-sharp fa-solid fa-qrcode"></i>}</button>
                {
                    this.state.shown &&
                    <div className='scanner-window'>

                        <QrReader
                            delay={this.state.delay}
                            style={previewStyle}
                            onError={this.handleError}
                            onScan={this.handleScan}
                        />

                    </div>
                }
            </>
        )
    }
}

const QrScannerWrapper = () => (
    <>
        <QrScanner />
        <ToastContainer position='top-right' />
    </>
);

export default QrScannerWrapper;
