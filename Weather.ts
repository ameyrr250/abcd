 //**
 //* Provides access to basic micro:bit functionality.
 //*/
//% color=#1E90FF weight=116 icon="\uf00a"

enum Weather_I2C_ADDRESS {
    //% block="0x76"
    ADDR_0x76 = 0x76,
    //% block="0x77"
    ADDR_0x77 = 0x77
}

enum Weather_T {
    //% block="C"
    T_C = 0,
    //% block="F"
    T_F = 1
}

enum Weather_P {
    //% block="Pa"
    Pa = 0,
    //% block="hPa"
    hPa = 1
}

enum below_above {
    //% block="<="
    below = 0,
    //% block=">="
    above = 1
}

/**
 * Weather
 */
//% weight=100 color=#70c0f0 icon="\uf042" block="Weather"
namespace Weather {

    export class Weather{

        Weather_I2C_ADDR : number;
        dig_T1 : number;
        dig_T2 : number;
        dig_T3 : number;
        dig_P1 : number;
        dig_P2 : number;
        dig_P3 : number;
        dig_P4 : number;
        dig_P5 : number;
        dig_P6 : number;
        dig_P7 : number;
        dig_P8 : number;
        dig_P9 : number;
        dig_H1 : number;
        dig_H2 : number;
        dig_H3 : number;
        a : number;
        dig_H4 : number;
        dig_H5 : number;
        dig_H6 : number;
        T : number;
        P : number;
        H : number;

        constructor(){
        this.Weather_I2C_ADDR = Weather_I2C_ADDRESS.ADDR_0x76;
        this.dig_T1 = this.getUInt16LE(0x88);
        this.dig_T2 = this.getInt16LE(0x8A);
        this.dig_T3 = this.getInt16LE(0x8C);
        this.dig_P1 = this.getUInt16LE(0x8E);
        this.dig_P2 = this.getInt16LE(0x90);
        this.dig_P3 = this.getInt16LE(0x92);
        this.dig_P4 = this.getInt16LE(0x94);
        this.dig_P5 = this.getInt16LE(0x96);
        this.dig_P6 = this.getInt16LE(0x98);
        this.dig_P7 = this.getInt16LE(0x9A);
        this.dig_P8 = this.getInt16LE(0x9C);
        this.dig_P9 = this.getInt16LE(0x9E);
        this.dig_H1 = this.getreg(0xA1);
        this.dig_H2 = this.getInt16LE(0xE1);
        this.dig_H3 = this.getreg(0xE3);
        this.a = this.getreg(0xE5);
        this.dig_H4 = (this.getreg(0xE4) << 4) + (this.a % 16);
        this.dig_H5 = (this.getreg(0xE6) << 4) + (this.a >> 4);
        this.dig_H6 = this.getInt8LE(0xE7);
        this.setreg(0xF2, 0x04)
        this.setreg(0xF4, 0x2F)
        this.setreg(0xF5, 0x0C)
        this.T = 0
        this.P = 0
        this.H = 0
        }
        setreg(reg: number, dat: number): void {
            let buf = pins.createBuffer(2);
            buf[0] = reg;
            buf[1] = dat;
            pins.i2cWriteBuffer(this.Weather_I2C_ADDR, buf);
        }

        getreg(reg: number): number {
            pins.i2cWriteNumber(this.Weather_I2C_ADDR, reg, NumberFormat.UInt8BE);
            return pins.i2cReadNumber(this.Weather_I2C_ADDR, NumberFormat.UInt8BE);
        }

        getInt8LE(reg: number): number {
            pins.i2cWriteNumber(this.Weather_I2C_ADDR, reg, NumberFormat.UInt8BE);
            return pins.i2cReadNumber(this.Weather_I2C_ADDR, NumberFormat.Int8LE);
        }

        getUInt16LE(reg: number): number {
            pins.i2cWriteNumber(this.Weather_I2C_ADDR, reg, NumberFormat.UInt8BE);
            return pins.i2cReadNumber(this.Weather_I2C_ADDR, NumberFormat.UInt16LE);
        }

        getInt16LE(reg: number): number {
            pins.i2cWriteNumber(this.Weather_I2C_ADDR, reg, NumberFormat.UInt8BE);
            return pins.i2cReadNumber(this.Weather_I2C_ADDR, NumberFormat.Int16LE);
        }


        get(): void {
            let adc_T = (this.getreg(0xFA) << 12) + (this.getreg(0xFB) << 4) + (this.getreg(0xFC) >> 4)
            let var1 = (((adc_T >> 3) - (this.dig_T1 << 1)) * this.dig_T2) >> 11
            let var2 = (((((adc_T >> 4) - this.dig_T1) * ((adc_T >> 4) - this.dig_T1)) >> 12) * this.dig_T3) >> 14
            let t = var1 + var2
            this.T = Math.idiv((t * 5 + 128) >> 8, 100)
            var1 = (t >> 1) - 64000
            var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * this.dig_P6
            var2 = var2 + ((var1 * this.dig_P5) << 1)
            var2 = (var2 >> 2) + (this.dig_P4 << 16)
            var1 = (((this.dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((this.dig_P2) * var1) >> 1)) >> 18
            var1 = ((32768 + var1) * this.dig_P1) >> 15
            if (var1 == 0)
                return; // avoid exception caused by division by zero
            let adc_P = (this.getreg(0xF7) << 12) + (this.getreg(0xF8) << 4) + (this.getreg(0xF9) >> 4)
            let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
            _p = Math.idiv(_p, var1) * 2;
            var1 = (this.dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
            var2 = (((_p >> 2)) * this.dig_P8) >> 13
            this.P = _p + ((var1 + var2 + this.dig_P7) >> 4)
            let adc_H = (this.getreg(0xFD) << 8) + this.getreg(0xFE)
            var1 = t - 76800
            var2 = (((adc_H << 14) - (this.dig_H4 << 20) - (this.dig_H5 * var1)) + 16384) >> 15
            var1 = var2 * (((((((var1 * this.dig_H6) >> 10) * (((var1 * this.dig_H3) >> 11) + 32768)) >> 10) + 2097152) * this.dig_H2 + 8192) >> 14)
            var2 = var1 - (((((var1 >> 15) * (var1 >> 15)) >> 7) * this.dig_H1) >> 4)
            if (var2 < 0) var2 = 0
            if (var2 > 419430400) var2 = 419430400
            this.H = (var2 >> 12) >> 10
        }

        /**
         * get pressure
         */
        //% blockId="Weather_GET_PRESSURE" block="pressure $u"
        //% weight=80 blockGap=8
        //% group="PRESSURE"
        pressure(u: Weather_P): number {
            this.get();
            if (u == Weather_P.Pa) return this.P;
            else return Math.idiv(this.P, 100)
        }

        /**
         * get temperature
         */
        //% blockId="Weather_GET_TEMPERATURE" block="temperature $u"
        //% weight=80 blockGap=8
        //% group="TEMPERATURE"
        temperature(u: Weather_T): number {
            this.get();
            if (u == Weather_T.T_C) return this.T;
            else return 32 + Math.idiv(this.T * 9, 5)
        }

        /**
         * get humidity
         */
        //% blockId="Weather_GET_HUMIDITY" block="humidity"
        //% weight=80 blockGap=8
        //% group="HUMIDITY"
        humidity(): number {
            this.get();
            return this.H;
        }

        /**
         * power on
         */
        //% blockId="Weather_POWER_ON" block="Power On"
        //% weight=22 blockGap=8
        //% group="POWER"
        PowerOn() {
            this.setreg(0xF4, 0x2F)
        }

        /**
         * power off
         */
        //% blockId="Weather_POWER_OFF" block="Power Off"
        //% weight=21 blockGap=8
        //% group="POWER"
        PowerOff() {
            this.setreg(0xF4, 0)
        }

        /**
         * Calculate Dewpoint
         */
        //% block="Dewpoint"
        //% weight=60 blockGap=8
        //% group="Added Features"
        Dewpoint(): number {
            this.get();
            return this.T - Math.idiv(100 - this.H, 5)
        }

        ///////////////////////////////////////////////////////////
        /**
         * Pressure below or above Event
         */
        //% blockId="Pressure_Below_Above"  block="Pressure below or above $u $dat" dat.defl=100000
        //% weight=80 blockGap=8
        //% group="PRESSURE"
        PressureBelowAbove( u: below_above, dat: number, body: () => void): void {
            control.inBackground(function () {
                while (true) {
                    this.get()
                    if(u == below_above.below)
                    {
                    if (this.P < dat) {
                        body()
                    }
                    }
                    if(u == below_above.above)
                    {
                    if (this.P > dat) {
                        body()
                    }
                    }
                    basic.pause(1000)
                }
            })
        }
        ///////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////
        /**
         * humidity below or above Event
         */
        //% blockId="Humidity_Below_Above" block="Humidity below or above $u $dat" dat.defl=30
        //% weight=80 blockGap=8
        //% group="HUMIDITY"
        HumidityBelowAbove( u: below_above, dat: number, body: () => void): void {
            control.inBackground(function () {
                while (true) {
                    this.get()
                    if(u == below_above.below)
                    {
                    if (this.H < dat) {
                        body()
                    }
                    }
                    if(u == below_above.above)
                    {
                    if (this.H > dat) {
                        body()
                    }
                    }
                    basic.pause(1000)
                }
            })
        }
        ////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////
        /**
         * temperature below or above Event
         */
        //% blockId="Temperature_Below_Above" block="Temperature below or above $u $dat" dat.defl=20
        //% weight=80 blockGap=8
        //% group="TEMPERATURE"

        TemperatureBelowAbove( u: below_above, dat: number, body: () => void): void {
            control.inBackground(function () {
                while (true) {
                    this.get()
                    if(u == below_above.below)
                    {
                    if (this.T < dat) {
                        body()
                    }
                    }
                    if(u == below_above.above)
                    {
                    if (this.T > dat) {
                        body()
                    }
                    }
                    basic.pause(1000)
                }
            })
        }

        ///////////////////////////////////////////////////////

        /**
         * set I2C address
         */
        //% blockId="Weather_SET_ADDRESS" block="set address $addr"
        //% weight=20 blockGap=8
        Address(addr: Weather_I2C_ADDRESS) {
            this.Weather_I2C_ADDR = addr
        }
    }
}  