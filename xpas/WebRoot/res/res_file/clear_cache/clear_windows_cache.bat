del "C:\Windows\Temp\*.*" /a/s/q
del "%USERPROFILE%\AppData\Local\Temp\*.*" /a/s/q
del "C:\inetpub\logs\LogFiles\*.*" /a/s/q
del "C:\inetpub\history\*.*" /a/s/q

del "E:\xpas2Project\xpas\WebRoot\res_run\*.*" /a/s/q
del "E:\xpas2Project\xpas\work\logs\*.*" /a/s/q

@echo off 
rem pause
rem ÑÓÊ±1000ºÁÃë
ping -n 1 -w 1000 192.168.169.300>nul
ping -n 1 -w 1000 192.168.169.300>nul