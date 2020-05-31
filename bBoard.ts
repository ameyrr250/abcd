



// Configuring command messages...


enum clickBoardID{
  
    //% block="1"
    one = 1,
    //% block="2"
    two,
    //% block="3"
    three,
    //% block="4"
    four,
    //% block="5"
    five,
    //% block="6"
    six,
    //% block="7"
    seven,
    //% block="8"
    eight,
        //% block="9"
        nine, 
        //% block="10"
        ten,
        //% block="11"
        eleven,
        //% block="12"
        twelve,
        //% block="13"
        thirteen,
        //% block="14"
        fourteen,
        //% block="15"
        fifteen,
        //% block="16"
        sixteen,
        //% block="17"
    seventeen,
    //% block="18"
    eighteen,
        //% block="19"
        nineteen, 
        //% block="20"
        twenty,
        //% block="21"
        twentyone,
        //% block="22"
        twentytwo,
        //% block="23"
        twentythree,
        //% block="24"
        twentyfour,
        //% block="25"
        twentyfive,
        //% block="26"
        twentysix,
          //% block="27"
          twentyseven,
          //% block="28"
          twentyeight,
          //% block="29"
          twentynine,
          //% block="30"
          thirty,
           //% block="31"
           thirtyone,
           //% block="32"
           thirtytwo

}


enum clickIOPin {

AN = 0x0001,
RST = 0x0002,
CS = 0x0004,
SCK = 0x0008,
MISO = 0x0010,
MOSI = 0x0020,
SDA = 0x0400,
SCL = 0x0800,
TX = 0x1000,
RX = 0x2000,
INT = 0x4000,
PWM = 0x8000


}
enum IOPullDirection
{
  
    //% block="Pull Up"
    one = 1,
    //% block="Pull Down"
    two = 2,
    //% block="None"
    three = 3

}
enum ODCEnable
{
  
    //% block="Disable Open Drain"
    zero = 0,
    //% block="Enable Open Drain"
    one = 1,
 

}
enum clickADCPin {
AN = 0x0001,
RST = 0x0002,
PWM = 0x8000

}
enum SPIMode {

Mode0 = 0,
Mode1 = 1,
Mode2 = 2,
Mode3 = 3

}


enum clickPWMPin {
AN = 0x0001,
RST = 0x0002,
PWM = 0x8000,
INT = 0x4000
}

enum clickIODirection {

input = 3,
output = 2

}

/**
 * Custom clickBoard
 */
//% weight=100 color=#9E4894 icon=""
//% advanced=true



//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#9E4894 icon=""
namespace bBoard {


    let AnalogValue = 0
    let BBOARD_BASE_ADDRESS = 40;
    let BBOARD_UART_TX_BUFF_SIZE = 128;
    let actionCount = 0
        
    let BBOARD_I2C_ADDRESS = 40

        
    let BBOARD_COMMAND_SW_VERSION = 9

    const enum RX_TX_Settings{

    BBOARD_COMMAND_CLEAR_TX_BUFFER = 1,
    BBOARD_COMMAND_READ_TX_BUFFER_DATA = 2,
    BBOARD_COMMAND_READ_TX_BUFFER_SIZE = 3,
    BBOARD_COMMAND_WRITE_RX_BUFFER_DATA = 4,
    BBOARD_COMMAND_CLEAR_RX_BUFFER = 0,
    BBOARD_COMMAND_EXECUTE_COMMAND = 7

    }

    // 'Clear BBoard tx buffer' command
    let CLEAR_BBOARD_TX_BUFFER = pins.createBuffer(1)
    CLEAR_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_CLEAR_TX_BUFFER)

    // 'Clear BBoard rx buffer' command
    let CLEAR_BBOARD_RX_BUFFER = pins.createBuffer(1)
    CLEAR_BBOARD_RX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_CLEAR_RX_BUFFER)

    // 'Read BBoard tx buffer size' command
    let READ_TX_BUFFER_SIZE = pins.createBuffer(1)
    READ_TX_BUFFER_SIZE.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_SIZE)

    // 'Execute BBoard command' command
    let EXECUTE_BBOARD_COMMAND = pins.createBuffer(1)
    EXECUTE_BBOARD_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_EXECUTE_COMMAND)

    // 'Read BBoard TX buffer' command
    let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
    READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)





// Module Ids
let GPIO_module_id = 1
let UART_module_id = 2
let I2C_module_id = 4
let SPI_module_id = 5
let PWM_module_id = 8
let ADC_module_id = 9
let STATUS_module_id = 0x10

// STATUS Ids
let Knock_Knock_id = 1
let FIRMWARE_VERSION_id = 2


// PWM Function Ids
let PWM_VAL_id = 1
let PWM_PR_id = 2
let PWM_channel_id
let PWM_dutyCycle



// ADC Function Ids
let ADC_READ_id = 16


    
    export class IOSettings{
            
        // GPIO Function Ids
        protected DIRSET_id : number
        protected DIRCLR_id : number
        protected GPIO_id : number
        protected SET_id : number
        protected CLR_id : number
        protected TOGGLE_id : number
        protected GPIOPULLENSET_id : number
        protected ODC_id : number

        constructor(){
        this.DIRSET_id = 2
        this.DIRCLR_id = 3
        this.GPIO_id = 4
        this.SET_id = 5
        this.CLR_id = 6
        this.TOGGLE_id = 7
        this.GPIOPULLENSET_id = 0x0B
        this.ODC_id = 0x0D
        }
        //%blockId=set_IO_direction
        //%block="Set %clickPin to %direction on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        setIODirection(clickPin: clickIOPin,direction: clickIODirection,clickBoardNum: clickBoardID ){
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
            if(direction == clickIODirection.output)
            {
                GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.DIRSET_id)

            }
            else{
                GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.DIRCLR_id)

            }
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 6, 0x00)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 7, 0x00)
            

            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_CONFIG_OUTPUT_PINS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)


        }

        //%blockId=Open_Drain_set
        //%block="%ODC_Enable on %clickPin on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        setOpenDrain(ODC_Enable: ODCEnable,clickPin: clickIOPin,clickBoardNum: clickBoardID ){

            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(7)



            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.ODC_id)

        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 6, ODC_Enable)
        
            

            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_CONFIG_OUTPUT_PINS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)


        }

        //%blockId=GPIO_pull_set
        //%block="Set %clickPin to %pullDirection on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        setPullDirection(clickPin: clickIOPin,pullDirection: IOPullDirection,clickBoardNum: clickBoardID ){

            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(7)



            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.GPIOPULLENSET_id)

        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 6, pullDirection)
        
            

            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_CONFIG_OUTPUT_PINS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)


        }





    }


   

    
    export class PWMSettings{
        pitchPin : number;
        pitchClick : number;

        constructor(){
        this.pitchPin = clickPWMPin.PWM; 
        this.pitchClick = clickBoardID.one;
        }

        analogPitch(frequency:number,ms:number)
        {
      
            if (frequency <= 0) {
            
            this.PWMOut(this.pitchPin,0,this.pitchClick);
            } else {
                this.PWMOut(this.pitchPin,70,this.pitchClick);
                this.PWMFrequency(this.pitchPin,frequency*100,this.pitchClick);
            }
    
            if (ms > 0) {
                control.waitMicros(ms*1000)
                
                this.PWMOut(this.pitchPin,0,this.pitchClick);
                // TODO why do we use wait_ms() here? it's a busy wait I think
                basic.pause(5);
            }
        
  
        }

        
        //%blockId=PWM_scaled
        //%block="Set PWM on pin %clickPin to %PWMValue on click%clickBoardNum with max = %PWMMax"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=true
        PWMScaled( clickPin: clickPWMPin,PWMValue: number,clickBoardNum: clickBoardID,PWMMax:number){
            let dutyCycle = PWMValue/PWMMax;
            this.PWMOut(clickPin,dutyCycle*100,clickBoardNum);
        }

            //%blockId=PWM_out
        //%block="Set PWM on pin %clickPin to %PWMValue on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% PWMValue.min=0 PWMValue.max=100 
        //% advanced=false
        PWMOut( clickPin: clickPWMPin,PWMValue: number,clickBoardNum: clickBoardID){

            let pinNum = 0; 
            let dutyCycle = 0;
            PWMValue = PWMValue/100; 
            dutyCycle = PWMValue * 1000;


            let GPIO_SET_PWM_DUTY = pins.createBuffer(8);
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 2, PWM_module_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 3, PWM_VAL_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 6, dutyCycle & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 7, (dutyCycle & 0xFF00)>>8)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_PWM_DUTY, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        
    


    
        }

        //%blockId=PWM_frequency
        //%block="Set PWM frequency on pin %clickPin to %PWMfreq on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        PWMFrequency( clickPin: clickPWMPin,PWMfreq: number,clickBoardNum: clickBoardID){

            let pinNum = 0; 


            let GPIO_SET_PWM_DUTY = pins.createBuffer(8);
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 2, PWM_module_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 3, PWM_PR_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 6, PWMfreq & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 7, (PWMfreq & 0xFF00)>>8)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_PWM_DUTY, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        
    


    
        }

    }

    ///Start of Class UARTSettings
    export class UARTSettings{
        //UART Function ids
        protected UART_STATUS : number
        protected UART_INTEN  : number
        protected UART_INTENCLR : number
        protected UART_BAUD_id  : number
        protected UART_WRITE_TX_DATA : number
        protected UART_READ_RX_DATA : number
        protected UART_READ_RX_DATA_BYTES : number
        protected UART_CLEAR_RX_DATA : number

        constructor(){
        this.UART_STATUS = 0
        this.UART_INTEN =  2
        this.UART_INTENCLR = 3
        this.UART_BAUD_id = 4
        this.UART_WRITE_TX_DATA = 5
        this.UART_READ_RX_DATA = 6
        this.UART_READ_RX_DATA_BYTES = 7
        this.UART_CLEAR_RX_DATA = 8

        }

    //%blockId=is_UART_Data_Avail
    //%block="Is UART data available on click%clickBoardNum ?"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    isUARTDataAvailable(clickBoardNum: clickBoardID):boolean {

      
      
        if (this.getUARTDataSize(clickBoardNum)) 
        {
            
           return true;
           
        }
     return false;
    }
 /**
    * Set the UART frequency
    * @param frequency the clock frequency, eg: 115200
    */
    //% weight=4 advanced=true
    //% blockId=bBoard_UART_frequency block="Set the UART frequency %frequency on click%clickBoardNum"
    UARTFrequency(frequency:number,clickBoardNum:clickBoardID) {
        
        // (Note: BRG = Fp / baudrate)
        //(Note: Fp = 40000000)

        let Fp = 40000000; //Frequency of the dspic Peripheral clock
        let brg = Fp/frequency 
        
        let UART_WRITE1_COMMAND = pins.createBuffer(6)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.UART_BAUD_id)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, brg & 0x00FF)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (brg & 0xFF00)>>8)
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UART_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

    }

    clearUARTRxBuffer(clickBoardNum: clickBoardID){


        let UART_CLEARRx_COMMAND = pins.createBuffer(5)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.UART_CLEAR_RX_DATA)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UART_CLEARRx_COMMAND, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    }

    getUARTDataSize(clickBoardNum: clickBoardID):number{
    
    
        let UARTSizeBuf = pins.createBuffer(4)
    
        let UART_TX_SIZE = 0
        let UART_RX_SIZE = 0

        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 3, this.UART_STATUS )

          // Ask the click board to send the number of the bytes in the UART Buffers to the bBoard
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTSizeBuf, false)
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
     
        // I then read the message sent back and build it into the RX and TX size
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 4, false)
        UART_RX_SIZE = TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256
        UART_TX_SIZE = TX_BUFFER_DATAbuf.getUint8(2) + TX_BUFFER_DATAbuf.getUint8(3) * 256

       
       return UART_RX_SIZE;
    }

    //%blockId=get_UART_Byte
    //%block="Get Byte from UART on click%clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    getUARTData(clickBoardNum: clickBoardID):string
    {


        let UART_Rx_BuffSize  = this.getUARTDataSize(clickBoardNum);
        let TX_BuffSize = 0
       
       
        let UARTDataBuf = pins.createBuffer(6)

        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 3, this.UART_READ_RX_DATA_BYTES )
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 4, UART_Rx_BuffSize & 0x00FF )
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 5, (UART_Rx_BuffSize & 0xFF00)>>8 )

         // I ask for the UART RX data to be sent to the bboard...
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTDataBuf, false)
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        
        // I check to see how many bytes have arrived on the bboard...
      //  pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
      //  pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_TX_BUFFER_SIZE, false)
      //  let TX_BUFFER_SizeBuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
      //  TX_BuffSize = TX_BUFFER_SizeBuf.getUint8(0) + TX_BUFFER_SizeBuf.getUint8(1) * 256 //

        // I retrieve those bytes from the bboard to the microbit
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)

        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, UART_Rx_BuffSize, false)

        return TX_BUFFER_DATAbuf.toString();
     }

    

    }
    ///END of Class UARTSettings


    ///Start of PinSettings
    export class PinSettings extends IOSettings{

        constructor(){
            super();
        }

        //%blockId=digital_Read_Pin
        //%block="Digital read pin %clickIOPin on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        digitalReadPin( clickPin: clickIOPin,clickBoardNum: clickBoardID):number
        {
            let pinStatus = 0;
            let READ_CLICKBOARD_DIGITAL_INPUTS = pins.createBuffer(6)
            let TX_BUFFER_DATAbuf = pins.createBuffer(2);
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 3, this.GPIO_id)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        

            // Send a message to read the digital input values
            // specified
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_CLICKBOARD_DIGITAL_INPUTS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    
            
            // I then actually read the data that has been
            // returned by the clickboard
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            control.waitMicros(500)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)

            TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false);
            pinStatus = (TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256) & clickPin;
    
            return pinStatus == 0 ? 0:1
        
        }
    
        //%blockId=write_pin
        //%block="Write %value to pin %clickIOPin on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        writePin(value: number, clickPin: clickIOPin,clickBoardNum: clickBoardID){
        
            if(value > 0){
                this.setPin(clickPin,clickBoardNum);
            
            }

            else{
                this.clearPin(clickPin,clickBoardNum);
            }
        
    
        }

    

        //%blockId=set_pin
        //%block="Set pin %clickIOPin on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        setPin(clickPin: clickIOPin,clickBoardNum: clickBoardID){

        // 'Set clickboard output pins values HIGH' command
        let GPIO_SET_OUTPUT_PINS_HIGH = pins.createBuffer(8)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 3, this.SET_id)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 6, 0x00)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 7, 0x00)

        //setIODirection(clickPin,clickIODirection.output,clickBoardNum); //Done automatically on bBoard
                
        // Send commands
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_OUTPUT_PINS_HIGH, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)  
        }

        //%blockId=clear_pin
        //%block="Clear pin %clickIOPin on click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        clearPin( clickPin: clickIOPin,clickBoardNum: clickBoardID){
        
        // 'Set clickboard output pins values LOW' command


        let GPIO_SET_OUTPUT_PINS_LOW = pins.createBuffer(8)

        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 3, this.CLR_id)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 6, 0x00)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 7, 0x00)
            
    // setIODirection(clickPin,clickIODirection.output,clickBoardNum); //Done automatically on bBoard
        // Send commands
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_OUTPUT_PINS_LOW, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    
    
        }

    }

    ///END of PinSettings


    //%blockId=getFirmwareVersion
    //%block="Get firmware version of click%clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    export function getFirmwareVersion(clickBoardNum: clickBoardID): number{

        let analogValue = 0;


        let GET_VERSION_COMMAND = pins.createBuffer(4)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 2, STATUS_module_id)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 3, FIRMWARE_VERSION_id)


        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GET_VERSION_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let VERSIONBuffer = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
        
        let versionInt = VERSIONBuffer.getUint8(1);
        let versionDec = VERSIONBuffer.getUint8(0);
        //basic.showNumber(versionInt)
        //basic.showNumber(versionDec)

        return (versionInt + versionDec/100);

    }



    //%blockId=Analog_Read
    //%block="Analog read pin %clickPin on click%clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    export function analogRead(clickPin: clickADCPin, clickBoardNum: clickBoardID): number{

        let analogValue = 0;


        let ADC_READ1_COMMAND = pins.createBuffer(6)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, ADC_module_id)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, ADC_READ_id)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)


        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, ADC_READ1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
        return (TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256)


      
    }


    ///START of SPISettings
    export class SPIsetting{
        // SPI Function Ids
        protected SPI_WRITE_id : number
        protected SPI_READ_id : number
        protected SPI_CONFIG_id : number
        protected SPI_WRITEBULK_id : number
        protected SPI_WRITEBULK_CS_id : number
        protected  SPI_READBULK_CS_id : number
        protected SPI_BAUD_id : number
        protected SPI_CONFIG_CS_id : number

        constructor(){
        this.SPI_WRITE_id = 1
        this.SPI_READ_id = 2
        this.SPI_CONFIG_id = 3
        this.SPI_WRITEBULK_id = 4
        this.SPI_WRITEBULK_CS_id = 5
        this. SPI_READBULK_CS_id = 6
        this.SPI_BAUD_id = 7
        this.SPI_CONFIG_CS_id = 8

        }
 
    //%blockId=spi_Write
    //%block="Write %value to SPI on click%clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=true

    SPIWrite(value: number, clickBoardNum: clickBoardID){
       

        let SPI_WRITE1_COMMAND = pins.createBuffer(5)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITE_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, value)

       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }


         //%blockId=spi_Write_array
    //%block="Write array %arrayValues to SPI on click %clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    SPIWriteArray(arrayValues: number[],clickBoardNum: clickBoardID){
       
        let arrayLength = arrayValues.length
        let SPI_WRITE1_COMMAND = pins.createBuffer(4+arrayLength)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITEBULK_id)

        
        for(let i=0;i<arrayLength;i++){

            SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, i + 4, arrayValues[i])

        }
     

       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }
    /**
    * Set the SPI frequency
    * @param frequency the clock frequency, eg: 1000000
    */
    //% help=pins/spi-frequency weight=4 advanced=true
    //% blockId=bBoard_spi_frequency block="Set the SPI frequency %frequency on click%clickBoardNum"
    spiFrequency(frequency:number,clickBoardNum:clickBoardID) {
        
        // (Note: BRG = ( Fp / (2 * BaudRate) ) - 1   )
       // (Note: Fp = 40000000)

        let Fp = 40000000; //Frequency of the dspic Peripheral clock
        let brgl = (Fp/(2*frequency))-1 
        
        let SPI_WRITE1_COMMAND = pins.createBuffer(6)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_BAUD_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, brgl & 0x00FF)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (brgl & 0xFF00)>>8)
        
        
    
    
 
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

    }


    //%blockId=spi_Write_buffer
    //%block="Write buffer %bufferValues to SPI on click %clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    SPIWriteBuffer(bufferValues: Buffer, clickBoardNum: clickBoardID){
       
        let bufferLength = bufferValues.length
        let SPI_WRITE1_COMMAND = pins.createBuffer(4+bufferLength)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITEBULK_id)
        
        for(let i=0;i<bufferLength;i++){

            SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, i + 4, bufferValues.getNumber(NumberFormat.UInt8LE,i))

        }
     
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }

       //%blockId=spi_Mode_Select
    //%block="Set SPI to %mode on click%clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    SPIModeSelect(mode: SPIMode, clickBoardNum: clickBoardID){
        let SPI_CKE = 1
        let SPI_CKP = 0


       switch(mode)
       {
        case SPIMode.Mode0:
            SPI_CKE = 1
            SPI_CKP = 0
            break;

        case SPIMode.Mode1:
            SPI_CKE = 0
            SPI_CKP = 0
            break;

        case SPIMode.Mode2:
            SPI_CKE = 1
            SPI_CKP = 1
        break;
        case SPIMode.Mode3:
            SPI_CKE = 0
            SPI_CKP = 1
        break;
       }
      


        let SPI_CONFIG_COMMAND = pins.createBuffer(6)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_CONFIG_id)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 4, SPI_CKE)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 5, SPI_CKP)
        
        
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_CONFIG_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
  
    }



    //%blockId=spi_Read
    //%block="Read %numBytes SPI bytes on click%clickBoardNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false

    SPIread(numBytes: number, clickBoardNum: clickBoardID):number{
   
        let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
        READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

        let SPI_READ1_COMMAND = pins.createBuffer(5)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_READ_id)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, numBytes)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_READ1_COMMAND, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
  
            control.waitMicros(500)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
           let  TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, numBytes, false)
            return TX_BUFFER_DATAbuf.getUint8(0)
      
        }

        /**
        * Set the SPI Chip Select Pin
        */
        //% weight=4 advanced=true
        //% blockId=bBoard_spi_CS block="Set the SPI CS Pin to %clickPin on click%clickBoardNum"
        spiCS(clickPin: clickIOPin,clickBoardNum:clickBoardID) {
        
    
        
        let SPI_WRITE1_COMMAND = pins.createBuffer(6)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_CONFIG_CS_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

        }


    }

    ///END  of SPISettings


    ///START of I2CSettings
        export class I2CSettings{

            // I2C Function Ids
            protected I2C_WRITE_id : number
            protected I2C_READ_id : number
            protected I2C_WRITE_NO_MEM_id : number
            protected I2C_READ_NO_MEM_id : number

            constructor(){
                this.I2C_WRITE_id = 1
                this.I2C_READ_id = 2
                this.I2C_WRITE_NO_MEM_id = 3
                this.I2C_READ_NO_MEM_id = 4

            }


      
        //%blockId=i2c_Read
    
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=true

        I2CreadNoMem(address:number, numBytes: number, clickBoardNum: clickBoardID):Buffer{
    
            let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
            let TX_BUFFER_DATAbuf = pins.createBuffer(numBytes);
            READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

            let I2C_READ1_COMMAND = pins.createBuffer(6)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, I2C_module_id)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.I2C_READ_NO_MEM_id)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, address)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, numBytes)


                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, I2C_READ1_COMMAND, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    
                control.waitMicros(500)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
                TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, numBytes, false)
                return TX_BUFFER_DATAbuf
        
        }

            //%blockId=i2c_Read
        
            //% blockGap=7
            //% weight=90   color=#9E4894 icon=""
            //% advanced=true

            I2Cread(address:number, memAddress:number,numBytes: number, clickBoardNum: clickBoardID):number{
        
                let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
                READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

                let I2C_READ1_COMMAND = pins.createBuffer(7)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, I2C_module_id)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.I2C_READ_id)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, address)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, memAddress)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 6, numBytes)


                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, I2C_READ1_COMMAND, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
                    control.waitMicros(500)
        
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
                let  TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, numBytes, false)
                    return TX_BUFFER_DATAbuf.getUint8(0)
            
            }


        //%blockId=send_UART_String
        //%block="Send string %UARTString to click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        sendString( UARTString: string,clickBoardNum: clickBoardID){
            let remainingBytes = UARTString.length
            
            while( remainingBytes )
            {
                let messageLength = Math.min(remainingBytes+ 4,128);
                let UARTBuf = pins.createBuffer(messageLength);

                UARTBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 3,  5)

                for(let i=4; i<messageLength;i++)
                {
                        UARTBuf.setNumber(NumberFormat.UInt8LE, i, UARTString.charCodeAt(UARTString.length - remainingBytes + i - 4));
                }

                // Send a message to the UART TX Line to ask for data
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTBuf, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
                remainingBytes =remainingBytes - messageLength + 4;
            }

        }

        //%blockId=send_UART_Buffer
        //%block="Send buffer %Buf to click%clickBoardNum"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false

        sendBuffer( Buf: Buffer,clickBoardNum: clickBoardID){

    

            let buffLength = Buf.length+4;
    

            let UARTBuf = pins.createBuffer(buffLength);

            

                    UARTBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 3, 5)

            

                    for(let i=0; i<buffLength-4;i++){
            
                        UARTBuf.setNumber(NumberFormat.UInt8LE, i+4, Buf.getNumber(NumberFormat.UInt8LE,i));
                    
                
                    }
                
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTBuf, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
                }

    }

    ///END of I2CSettings



}



