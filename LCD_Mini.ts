



enum lineNumber{
  
    //% block="1"
    one = 0,
    //% block="2"
    two,
  

}



//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#D400D4 icon=""
//% advanced=true
namespace LCD_Mini{

const LOW = 0;
const HIGH = 1;

let LCDInitialize = false


let CS = clickIOPin.CS;
let CS2 = clickIOPin.AN;
let RST = clickIOPin.RST;

export function __delay_us(delayuS: number)
{
    control.waitMicros(delayuS)

}


export function lcd_sendNibble(nibble: number, RSbit: number, clickBoardNum: clickBoardID){
    let packet = (nibble << 4) | (RSbit << 2);
    expander_setOutput(packet, clickBoardNum);
    expander_setOutput(packet | (1<<3), clickBoardNum);
    __delay_us(1);
    expander_setOutput(packet, clickBoardNum);
    __delay_us(40);
}


export function lcd_sendByte(byte: number, RSbit:number, clickBoardNum: clickBoardID){
    let nibbleHigh = byte >> 4;
    let nibbleLow = byte & 0xF;
    let packetHigh = (nibbleHigh << 4) | (RSbit << 2);
    let packetLow = (nibbleLow << 4) | (RSbit << 2);
    
    expander_setOutput(packetHigh,clickBoardNum);
    __delay_us(2);
    expander_setOutput(packetHigh | (1<<3),clickBoardNum);
    __delay_us(2);
    expander_setOutput(packetLow,clickBoardNum)
    __delay_us(2);
    expander_setOutput(packetLow | (1<<3),clickBoardNum);
    __delay_us(40);
}

export function lcd_returnHome(clickBoardNum: clickBoardID){
    lcd_sendByte(0b10, 0,clickBoardNum);
    basic.pause(2)
   
}
 //% blockId=LCD_Clear
    //% block="Clear the LCD on click%clickBoardNum"
    //% weight=80
    //% blockGap=7
export function lcd_clearDisplay( clickBoardNum: clickBoardID){
    lcd_sendByte(1, 0,clickBoardNum);
    basic.pause(2)
}

export function lcd_setAddr(row:number, character:number, clickBoardNum: clickBoardID){
    lcd_sendByte(0x80 | (character + (row*40)), 0,clickBoardNum);
}

export function lcd_writeChar(character:string, clickBoardNum: clickBoardID){
    lcd_sendByte(character.charCodeAt(0),1,clickBoardNum);
}

export function lcd_setContrast(contrast:number, clickBoardNum: clickBoardID){
    digipot_setWiper(contrast,clickBoardNum);
}

export function lcd_setup( clickBoardNum: clickBoardID){
    const PinSet = new bBoard.PinSettings;
    PinSet.writePin(HIGH,RST, clickBoardNum);
    PinSet.writePin(HIGH,CS2, clickBoardNum);
    PinSet.writePin(HIGH,CS, clickBoardNum);

    expander_setup(clickBoardNum);
    expander_setOutput(0,clickBoardNum);
    basic.pause(40)
    lcd_sendNibble(0b11, 0,clickBoardNum);
    basic.pause(10)

    lcd_sendNibble(0b11,  0,clickBoardNum);
    basic.pause(10)

    lcd_sendNibble(0b11,  0,clickBoardNum);
    basic.pause(10)

    lcd_sendNibble(0x2, 0,clickBoardNum);
    lcd_sendByte(0x2C,  0,clickBoardNum);
    lcd_sendByte(0b1100,  0,clickBoardNum);
    lcd_sendByte(0x06,  0,clickBoardNum);
    lcd_sendByte(0x0C,  0,clickBoardNum);
    basic.pause(2)

    lcd_returnHome(clickBoardNum);
    lcd_clearDisplay(clickBoardNum);
}



const IODIRB = 0x01
const OLATB = 0x15
const WRITE_BYTE = 0b01000000

function expander_sendByte(addr:number, byte:number, clickBoardNum: clickBoardID){
    //spi1_master_open(LCD);
  //  LCDMini_nCS_LAT = 0;
  const SPIObj= new bBoard.SPIsetting;
  let cmd=[WRITE_BYTE,addr,byte];
  //bBoard.clearPin(CS,clickBoardNum)
     SPIObj.SPIWriteArray(cmd,clickBoardNum)
   

 //bBoard.setPin(CS,clickBoardNum)
     
}

function expander_setup( clickBoardNum: clickBoardID){
    expander_sendByte(IODIRB, 0,clickBoardNum);
}

function expander_setOutput(output:number, clickBoardNum: clickBoardID){
    expander_sendByte(OLATB, output,clickBoardNum);
}


export function digipot_setWiper(val:number, clickBoardNum: clickBoardID){

    let cmd = [0,val];
   const SPIObj= new bBoard.SPIsetting;
   // bBoard.clearPin(CS2,clickBoardNum)
    SPIObj.spiCS(CS2,clickBoardNum)
    SPIObj.SPIWriteArray(cmd,clickBoardNum)
    SPIObj.spiCS(CS,clickBoardNum)
//bBoard.setPin(CS2,clickBoardNum)
}


    //% blockId=LCDWriteString
    //% block="Write 2 %LCDstring to line %lineNum on click board %clickBoardNum"
    //% weight=80
    //% blockGap=7
export function lcd_writeString(LCDstring:string, lineNum: lineNumber, clickBoardNum: clickBoardID) {
    //let LCDstring1=['x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x']
    if(LCDInitialize == false)
    {
        lcd_setup(clickBoardNum);
        lcd_setContrast(0x30,clickBoardNum)
        LCDInitialize = true; //LCD has been initialized
    }

    lcd_setAddr(lineNum, 0,clickBoardNum);
    let i = 0;
    for (i = 1; i < 16; i++) {
        if (LCDstring[i]) {
            lcd_writeChar(LCDstring[i],clickBoardNum);
        }
    }
    lcd_returnHome(clickBoardNum);
}

}
