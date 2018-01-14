
scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

resolvers += "Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/"

resolvers += "Typesafe Snapshots" at "http://repo.typesafe.com/typesafe/snapshots/"

lazy val commonSettings = Seq(
  organization := "com.samemoment",
  version := "0.1.0",
  scalaVersion := "2.11.8"
)

lazy val root = (project in file("."))
  .settings(commonSettings: _*)
  .settings(
    name := "Load Test",
    libraryDependencies ++= Dependencies.commonDependencies ++ Dependencies.gatlingDependencies
  )
  .enablePlugins(GatlingPlugin)

