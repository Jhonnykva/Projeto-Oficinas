EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L bib-esp32:esp32-cam esp1
U 1 1 618D33F1
P 6500 3250
F 0 "esp1" H 6575 4115 50  0000 C CNN
F 1 "esp32-cam" H 6575 4024 50  0000 C CNN
F 2 "footprint-esp32-cam:ESP32CAM" H 6450 3950 50  0001 C CNN
F 3 "" H 6450 3950 50  0001 C CNN
	1    6500 3250
	1    0    0    -1  
$EndComp
$Comp
L Regulator_Linear:L7805 Reg1
U 1 1 618E0114
P 5100 2650
F 0 "Reg1" H 5100 2892 50  0000 C CNN
F 1 "L7805" H 5100 2801 50  0000 C CNN
F 2 "LM7805 (1):lm7805" H 5125 2500 50  0001 L CIN
F 3 "http://www.st.com/content/ccc/resource/technical/document/datasheet/41/4f/b3/b0/12/d4/47/88/CD00000444.pdf/files/CD00000444.pdf/jcr:content/translations/en.CD00000444.pdf" H 5100 2600 50  0001 C CNN
	1    5100 2650
	1    0    0    -1  
$EndComp
$Comp
L Device:CP1 C1
U 1 1 618E011A
P 4750 3100
F 0 "C1" H 4865 3146 50  0000 L CNN
F 1 "0,33uF" H 4865 3055 50  0000 L CNN
F 2 "Capacitor_THT:C_Disc_D3.0mm_W2.0mm_P2.50mm" H 4750 3100 50  0001 C CNN
F 3 "~" H 4750 3100 50  0001 C CNN
	1    4750 3100
	1    0    0    -1  
$EndComp
$Comp
L Device:CP1 C2
U 1 1 618E0120
P 5400 3100
F 0 "C2" H 5515 3146 50  0000 L CNN
F 1 "0,1uF" H 5515 3055 50  0000 L CNN
F 2 "Capacitor_THT:C_Disc_D3.0mm_W2.0mm_P2.50mm" H 5400 3100 50  0001 C CNN
F 3 "~" H 5400 3100 50  0001 C CNN
	1    5400 3100
	1    0    0    -1  
$EndComp
Wire Wire Line
	4750 2950 4750 2650
Wire Wire Line
	4750 2650 4800 2650
Wire Wire Line
	5400 2950 5400 2650
Wire Wire Line
	5400 3250 5400 3400
Wire Wire Line
	5400 3400 5100 3400
Wire Wire Line
	4750 3400 4750 3250
Connection ~ 4750 3400
Connection ~ 4750 2650
Wire Wire Line
	5100 2950 5100 3400
Connection ~ 5100 3400
Wire Wire Line
	5100 3400 4750 3400
Wire Wire Line
	4300 2650 4750 2650
$Comp
L power:GNDREF #PWR0101
U 1 1 618E0134
P 4450 3400
F 0 "#PWR0101" H 4450 3150 50  0001 C CNN
F 1 "GNDREF" H 4455 3227 50  0000 C CNN
F 2 "" H 4450 3400 50  0001 C CNN
F 3 "" H 4450 3400 50  0001 C CNN
	1    4450 3400
	1    0    0    -1  
$EndComp
Connection ~ 4450 3400
$Comp
L Device:R R1
U 1 1 618E013C
P 3200 3300
F 0 "R1" H 3270 3346 50  0000 L CNN
F 1 "2M" H 3270 3255 50  0000 L CNN
F 2 "Resistor_THT:R_Axial_DIN0204_L3.6mm_D1.6mm_P7.62mm_Horizontal" V 3130 3300 50  0001 C CNN
F 3 "~" H 3200 3300 50  0001 C CNN
	1    3200 3300
	1    0    0    -1  
$EndComp
$Comp
L Device:R R2
U 1 1 618E0142
P 3650 3300
F 0 "R2" H 3720 3346 50  0000 L CNN
F 1 "2M" H 3720 3255 50  0000 L CNN
F 2 "Resistor_THT:R_Axial_DIN0204_L3.6mm_D1.6mm_P7.62mm_Horizontal" V 3580 3300 50  0001 C CNN
F 3 "~" H 3650 3300 50  0001 C CNN
	1    3650 3300
	1    0    0    -1  
$EndComp
$Comp
L Device:R R3
U 1 1 618E0148
P 3400 2850
F 0 "R3" H 3470 2896 50  0000 L CNN
F 1 "4.7M" H 3470 2805 50  0000 L CNN
F 2 "Resistor_THT:R_Axial_DIN0204_L3.6mm_D1.6mm_P7.62mm_Horizontal" V 3330 2850 50  0001 C CNN
F 3 "~" H 3400 2850 50  0001 C CNN
	1    3400 2850
	1    0    0    -1  
$EndComp
Wire Wire Line
	3400 2650 3400 2700
Connection ~ 4300 2650
$Comp
L power:+9V #vcc0101
U 1 1 618E0165
P 4300 2900
F 0 "#vcc0101" H 4300 2750 50  0001 C CNN
F 1 "+9V" H 4242 2937 50  0000 R CNN
F 2 "" H 4300 2900 50  0001 C CNN
F 3 "" H 4300 2900 50  0001 C CNN
	1    4300 2900
	-1   0    0    1   
$EndComp
Wire Wire Line
	4450 3400 4650 3400
Wire Wire Line
	5400 2650 5550 2650
Wire Wire Line
	5850 2650 5850 3350
Wire Wire Line
	5850 3350 6200 3350
Connection ~ 5400 2650
Wire Wire Line
	6200 3250 6000 3250
Wire Wire Line
	6000 3250 6000 3400
Connection ~ 5400 3400
$Comp
L Connector_Generic:Conn_01x08 mpu6050
U 1 1 618FF511
P 4800 4550
F 0 "mpu6050" V 4672 4930 50  0000 L CNN
F 1 "Conn_01x08" V 4763 4930 50  0000 L CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x09_P2.54mm_Vertical" H 4800 4550 50  0001 C CNN
F 3 "~" H 4800 4550 50  0001 C CNN
	1    4800 4550
	0    1    1    0   
$EndComp
Wire Wire Line
	6200 2850 6100 2850
Wire Wire Line
	6100 4200 4600 4200
Wire Wire Line
	4600 4200 4600 4350
Wire Wire Line
	6200 2950 6050 2950
Wire Wire Line
	6050 2950 6050 4150
Wire Wire Line
	6050 4150 4700 4150
Wire Wire Line
	4700 4150 4700 4350
Wire Wire Line
	4500 4350 4500 4150
Wire Wire Line
	4500 4150 4650 4150
Connection ~ 4650 3400
Wire Wire Line
	4650 3400 4750 3400
Wire Wire Line
	4400 4100 4400 4350
NoConn ~ 5100 4350
NoConn ~ 5000 4350
NoConn ~ 4900 4350
NoConn ~ 4800 4350
$Comp
L Connector_Generic:Conn_01x03 servoM1
U 1 1 61929CF0
P 7950 3450
F 0 "servoM1" H 8030 3492 50  0000 L CNN
F 1 "1" H 8030 3401 50  0000 L CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x03_P2.54mm_Vertical" H 7950 3450 50  0001 C CNN
F 3 "~" H 7950 3450 50  0001 C CNN
	1    7950 3450
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x06 gravEsp1
U 1 1 61933B5E
P 7950 2750
F 0 "gravEsp1" H 8030 2742 50  0000 L CNN
F 1 "1" H 8030 2651 50  0000 L CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x06_P2.54mm_Vertical" H 7950 2750 50  0001 C CNN
F 3 "~" H 7950 2750 50  0001 C CNN
	1    7950 2750
	1    0    0    -1  
$EndComp
Wire Wire Line
	6950 2650 6950 2550
Wire Wire Line
	6950 2550 7750 2550
Wire Wire Line
	5850 2650 5850 2300
Wire Wire Line
	5850 2300 7650 2300
Wire Wire Line
	7650 2300 7650 2750
Wire Wire Line
	7650 2750 7750 2750
Connection ~ 5850 2650
Wire Wire Line
	6950 2750 7550 2750
Wire Wire Line
	7550 2750 7550 2850
Wire Wire Line
	7550 2850 7750 2850
Wire Wire Line
	6950 2850 7500 2850
Wire Wire Line
	7500 2850 7500 2950
Wire Wire Line
	7500 2950 7750 2950
NoConn ~ 7750 2650
NoConn ~ 7750 3050
Wire Wire Line
	6150 3500 7250 3500
Wire Wire Line
	7250 3500 7250 3350
Wire Wire Line
	7250 3350 7750 3350
Wire Wire Line
	7650 2750 7650 3450
Wire Wire Line
	7650 3450 7750 3450
Connection ~ 7650 2750
Wire Wire Line
	6950 3050 7600 3050
Wire Wire Line
	7600 3050 7600 3550
Wire Wire Line
	7600 3550 7750 3550
$Comp
L Connector_Generic:Conn_01x01 IO0
U 1 1 619792F0
P 7100 4000
F 0 "IO0" V 6972 4080 50  0000 L CNN
F 1 "0" V 7063 4080 50  0000 L CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x01_P2.54mm_Vertical" H 7100 4000 50  0001 C CNN
F 3 "~" H 7100 4000 50  0001 C CNN
	1    7100 4000
	0    1    1    0   
$EndComp
Wire Wire Line
	7100 3800 7100 3150
Wire Wire Line
	7100 3150 6950 3150
$Comp
L Connector_Generic:Conn_01x02 Vcc3
U 1 1 6198BEEC
P 4100 2050
F 0 "Vcc3" V 4064 1862 50  0000 R CNN
F 1 "5" V 3973 1862 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x02_P2.54mm_Vertical" H 4100 2050 50  0001 C CNN
F 3 "~" H 4100 2050 50  0001 C CNN
	1    4100 2050
	0    -1   -1   0   
$EndComp
$Comp
L Connector_Generic:Conn_01x02 Vcc2
U 1 1 61991E08
P 3550 2050
F 0 "Vcc2" V 3514 1862 50  0000 R CNN
F 1 "9" V 3423 1862 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x02_P2.54mm_Vertical" H 3550 2050 50  0001 C CNN
F 3 "~" H 3550 2050 50  0001 C CNN
	1    3550 2050
	0    -1   -1   0   
$EndComp
Wire Wire Line
	5550 2650 5550 2350
Connection ~ 5550 2650
Wire Wire Line
	5550 2650 5850 2650
Wire Wire Line
	3650 2250 3650 2300
Connection ~ 3650 2650
Wire Wire Line
	3650 2650 3400 2650
Wire Wire Line
	4300 2650 3650 2650
Connection ~ 3650 2300
Wire Wire Line
	3650 2300 3650 2650
Wire Wire Line
	4200 2350 4200 2250
Wire Wire Line
	4200 2350 5550 2350
Wire Wire Line
	4100 2250 4200 2250
Connection ~ 4200 2250
Wire Wire Line
	3650 2300 3550 2300
Wire Wire Line
	3550 2300 3550 2250
Wire Wire Line
	6950 4100 6950 3350
Wire Wire Line
	4400 4100 6900 4100
NoConn ~ 6200 2750
NoConn ~ 6950 2950
NoConn ~ 6950 3250
$Comp
L Connector_Generic:Conn_01x01 DivTen1
U 1 1 619283DC
P 3950 3050
F 0 "DivTen1" V 3822 3130 50  0000 L CNN
F 1 "1" V 3913 3130 50  0000 L CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x01_P2.54mm_Vertical" H 3950 3050 50  0001 C CNN
F 3 "~" H 3950 3050 50  0001 C CNN
	1    3950 3050
	1    0    0    -1  
$EndComp
Connection ~ 4300 2850
Wire Wire Line
	4300 2850 4300 2800
Wire Wire Line
	4300 2900 4300 2850
$Comp
L power:PWR_FLAG #FLG0101
U 1 1 619EC7A5
P 4300 2850
F 0 "#FLG0101" H 4300 2925 50  0001 C CNN
F 1 "PWR_FLAG" V 4300 2978 50  0000 L CNN
F 2 "" H 4300 2850 50  0001 C CNN
F 3 "~" H 4300 2850 50  0001 C CNN
	1    4300 2850
	0    1    1    0   
$EndComp
$Comp
L power:PWR_FLAG #Flg0101
U 1 1 619EDE3A
P 4350 3400
F 0 "#Flg0101" H 4350 3475 50  0001 C CNN
F 1 "PWR_FLAG" H 4418 3442 50  0000 L CNN
F 2 "" H 4350 3400 50  0001 C CNN
F 3 "~" H 4350 3400 50  0001 C CNN
	1    4350 3400
	1    0    0    -1  
$EndComp
Connection ~ 4350 3400
Wire Wire Line
	4350 3400 4450 3400
$Comp
L Connector_Generic:Conn_01x02 Bateria1
U 1 1 6198ACB5
P 4450 3050
F 0 "Bateria1" V 4414 2862 50  0000 R CNN
F 1 "0" V 4323 2862 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x02_P2.54mm_Vertical" H 4450 3050 50  0001 C CNN
F 3 "~" H 4450 3050 50  0001 C CNN
	1    4450 3050
	1    0    0    -1  
$EndComp
Wire Wire Line
	3400 3000 3400 3050
Wire Wire Line
	3400 3150 3200 3150
Wire Wire Line
	3650 3150 3400 3150
Connection ~ 3400 3150
Connection ~ 3400 3050
Wire Wire Line
	3400 3050 3400 3150
Wire Wire Line
	3650 3450 3650 3600
Wire Wire Line
	3650 3600 3200 3600
Wire Wire Line
	3200 3600 3200 3450
Wire Wire Line
	3650 3600 4050 3600
Wire Wire Line
	4050 3600 4050 3400
Wire Wire Line
	4050 3400 4250 3400
Connection ~ 3650 3600
Wire Wire Line
	3400 3050 3750 3050
Wire Wire Line
	4250 3150 4250 3400
Connection ~ 4250 3400
Wire Wire Line
	4250 3400 4350 3400
Wire Wire Line
	4250 3050 4200 3050
Wire Wire Line
	4200 3050 4200 2800
Wire Wire Line
	4200 2800 4300 2800
Connection ~ 4300 2800
Wire Wire Line
	4300 2800 4300 2650
$Comp
L Connector_Generic:Conn_01x02 Gnd2
U 1 1 618CDBE9
P 4950 3550
F 0 "Gnd2" V 4914 3362 50  0000 R CNN
F 1 "0" V 4823 3362 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x02_P2.54mm_Vertical" H 4950 3550 50  0001 C CNN
F 3 "~" H 4950 3550 50  0001 C CNN
	1    4950 3550
	1    0    0    -1  
$EndComp
Wire Wire Line
	4650 3400 4650 3650
Wire Wire Line
	4750 3550 4700 3550
Wire Wire Line
	4700 3550 4700 3650
Wire Wire Line
	4700 3650 4750 3650
Wire Wire Line
	4700 3650 4650 3650
Connection ~ 4700 3650
Connection ~ 4650 3650
Wire Wire Line
	4650 3650 4650 4150
Wire Wire Line
	6100 2850 6100 4200
Wire Wire Line
	6150 3500 6150 3050
Wire Wire Line
	6150 3050 6200 3050
NoConn ~ 6200 2650
$Comp
L Device:R R4
U 1 1 618F03C6
P 6100 4550
F 0 "R4" H 6170 4596 50  0000 L CNN
F 1 "10K" H 6170 4505 50  0000 L CNN
F 2 "Resistor_THT:R_Axial_DIN0204_L3.6mm_D1.6mm_P7.62mm_Horizontal" V 6030 4550 50  0001 C CNN
F 3 "~" H 6100 4550 50  0001 C CNN
	1    6100 4550
	0    1    1    0   
$EndComp
$Comp
L Connector_Generic:Conn_01x02 buttom1
U 1 1 618F353E
P 6750 4450
F 0 "buttom1" V 6714 4262 50  0000 R CNN
F 1 "0" V 6623 4262 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x02_P2.54mm_Vertical" H 6750 4450 50  0001 C CNN
F 3 "~" H 6750 4450 50  0001 C CNN
	1    6750 4450
	1    0    0    -1  
$EndComp
Wire Wire Line
	7050 4250 6900 4250
Wire Wire Line
	6900 4250 6900 4100
Connection ~ 6900 4100
Wire Wire Line
	6900 4100 6950 4100
Wire Wire Line
	5400 3400 5700 3400
Wire Wire Line
	6200 3150 5950 3150
Wire Wire Line
	5950 3150 5950 4450
Wire Wire Line
	5950 4450 6300 4450
Wire Wire Line
	6300 4450 6300 4550
Wire Wire Line
	6300 4550 6250 4550
Connection ~ 6300 4450
Wire Wire Line
	6300 4450 6550 4450
Wire Wire Line
	5950 4550 5700 4550
Wire Wire Line
	5700 4550 5700 3400
Connection ~ 5700 3400
Wire Wire Line
	5700 3400 6000 3400
Wire Wire Line
	6550 4550 6550 4750
Wire Wire Line
	6550 4750 7050 4750
Wire Wire Line
	7050 4750 7050 4250
$EndSCHEMATC
