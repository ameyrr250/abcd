



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

export class LCDSettings{
        LOW : number;
        HIGH : number;
        LCDInitialize : boolean;
        CS : number;
        CS2 : number;
        RST : number;
        IODIRB : number;
        OLATB : number;
        WRITE_BYTE : number;

        constructor(){
        this.LOW = 0; 
        this.HIGH = 1;
        this.LCDInitialize = false;
        this.CS = clickIOPin.CS;
        this.CS2 = clickIOPin.AN;
        this.RST = clickIOPin.RST;
        this.IODIRB = 0x01;
        this.OLATB = 0x15;
        this.WRITE_BYTE = 0b01000000;
        }

        __delay_us(delayuS: number)
        {
            control.waitMicros(delayuS)

        }

        lcd_sendNibble(nibble: number, RSbit: number, clickBoardNum: clickBoardID){
        let packet = (nibble << 4) | (RSbit << 2);
        this.expander_setOutput(packet, clickBoardNum);
        this.expander_setOutput(packet | (1<<3), clickBoardNum);
        this.__delay_us(1);
        this.expander_setOutput(packet, clickBoardNum);
        this.__delay_us(40);
        }


        lcd_sendByte(byte: number, RSbit:number, clickBoardNum: clickBoardID){
        let nibbleHigh = byte >> 4;
        let nibbleLow = byte & 0xF;
        let packetHigh = (nibbleHigh << 4) | (RSbit << 2);
        let packetLow = (nibbleLow << 4) | (RSbit << 2);
        
        this.expander_setOutput(packetHigh,clickBoardNum);
        this.__delay_us(2);
        this.expander_setOutput(packetHigh | (1<<3),clickBoardNum);
        this.__delay_us(2);
        this.expander_setOutput(packetLow,clickBoardNum)
        this.__delay_us(2);
        this.expander_setOutput(packetLow | (1<<3),clickBoardNum);
        this.__delay_us(40);
        }
    
        lcd_returnHome(clickBoardNum: clickBoardID){
            this.lcd_sendByte(0b10, 0,clickBoardNum);
            basic.pause(2)
           
        }


        //% blockId=LCD_Clear
        //% block="Clear the LCD on click $clickBoardNum"
        //% weight=80
        //% blockGap=7
        lcd_clearDisplay( clickBoardNum: clickBoardID){
        this.lcd_sendByte(1, 0,clickBoardNum);
        basic.pause(2)
        }

        lcd_setAddr(row:number, character:number, clickBoardNum: clickBoardID){
        this.lcd_sendByte(0x80 | (character + (row*40)), 0,clickBoardNum);
        }

        lcd_writeChar(character:string, clickBoardNum: clickBoardID){
        this.lcd_sendByte(character.charCodeAt(0),1,clickBoardNum);
        }

        lcd_setContrast(contrast:number, clickBoardNum: clickBoardID){
        this.digipot_setWiper(contrast,clickBoardNum);
        }

        lcd_setup( clickBoardNum: clickBoardID){
        const PinSet = new bBoard.PinSettings;
        PinSet.writePin(this.HIGH,this.RST, clickBoardNum);
        PinSet.writePin(this.HIGH,this.CS2, clickBoardNum);
        PinSet.writePin(this.HIGH,this.CS, clickBoardNum);

        this.expander_setup(clickBoardNum);
        this.expander_setOutput(0,clickBoardNum);
        basic.pause(40)
        this.lcd_sendNibble(0b11, 0,clickBoardNum);
        basic.pause(10)

        this.lcd_sendNibble(0b11,  0,clickBoardNum);
        basic.pause(10)

        this.lcd_sendNibble(0b11,  0,clickBoardNum);
        basic.pause(10)

        this.lcd_sendNibble(0x2, 0,clickBoardNum);
        this.lcd_sendByte(0x2C,  0,clickBoardNum);
        this.lcd_sendByte(0b1100,  0,clickBoardNum);
        this.lcd_sendByte(0x06,  0,clickBoardNum);
        this.lcd_sendByte(0x0C,  0,clickBoardNum);
        basic.pause(2)

        this.lcd_returnHome(clickBoardNum);
        this.lcd_clearDisplay(clickBoardNum);
        }


        expander_sendByte(addr:number, byte:number, clickBoardNum: clickBoardID){
        //spi1_master_open(LCD);
        //  LCDMini_nCS_LAT = 0;
        const SPIObj= new bBoard.SPIsetting;
        let cmd=[this.WRITE_BYTE,addr,byte];
        //bBoard.clearPin(CS,clickBoardNum)
        SPIObj.SPIWriteArray(cmd,clickBoardNum)
        //bBoard.setPin(CS,clickBoardNum)
        }

        expander_setup( clickBoardNum: clickBoardID){
        this.expander_sendByte(this.IODIRB, 0,clickBoardNum);
        }

        expander_setOutput(output:number, clickBoardNum: clickBoardID){
        this.expander_sendByte(this.OLATB, output,clickBoardNum);
        }

        digipot_setWiper(val:number, clickBoardNum: clickBoardID){
        let cmd = [0,val];
        const SPIObj= new bBoard.SPIsetting;
        // bBoard.clearPin(CS2,clickBoardNum)
        SPIObj.spiCS(this.CS2,clickBoardNum)
        SPIObj.SPIWriteArray(cmd,clickBoardNum)
        SPIObj.spiCS(this.CS,clickBoardNum)
        //bBoard.setPin(CS2,clickBoardNum)
        }

        //% blockId=LCDWriteString
        //% block="Write $LCDstring to line $lineNum on click board $clickBoardNum"
        //% weight=80
        //% blockGap=7
        //% group="Write"

        lcd_writeString(LCDstring:string, lineNum: lineNumber, clickBoardNum: clickBoardID) {
        //let LCDstring1=['x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x']
        if(this.LCDInitialize == false)
        {
            this.lcd_setup(clickBoardNum);
            this.lcd_setContrast(0x30,clickBoardNum)
            this.LCDInitialize = true; //LCD has been initialized
        }

        this.lcd_setAddr(lineNum, 0,clickBoardNum);
        let i = 0;
        for (i = 1; i < 16; i++) {
            if (LCDstring[i]) {
                this.lcd_writeChar(LCDstring[i],clickBoardNum);
            }
        }
        this.lcd_returnHome(clickBoardNum);
        }

    }
    }



