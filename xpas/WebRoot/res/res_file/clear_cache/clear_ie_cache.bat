del "%USERPROFILE%\AppData\Local\Microsoft\Windows\Temporary Internet Files\*.*" /a/s/q
del "%USERPROFILE%\AppData\Local\Microsoft\Windows\INetCache\*.*" /a/s/q

del "D:\as_xpas2_x64\apache-tomcat-9.0.0.M19\logs\*.*" /a/s/q

del "E:\xpas2Project\xpas\WebRoot\res_run\xpas\*.*" /a/s/q
rem del "E:\xpas2Project\xpas\WebRoot\res_run\*.*" /a/s/q
rem del "E:\xpas2Project\xpas\work\logs\*.*" /a/s/q


@echo off 
rem pause
rem 延时1000毫秒
ping -n 1 -w 1000 192.168.169.300>nul
ping -n 1 -w 1000 192.168.169.300>nul