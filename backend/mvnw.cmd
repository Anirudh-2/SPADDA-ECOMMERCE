@echo off
setlocal
set "MAVEN_PROJECTBASEDIR=%~dp0"
if exist "%JAVA_HOME%\bin\java.exe" (
  set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
) else (
  set "JAVA_EXE=java"
)
"%JAVA_EXE%" -classpath "%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar" "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*
