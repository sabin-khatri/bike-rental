import 'package:flutter/material.dart';
import 'package:mmamc_2/my_college.dart';
import 'package:mmamc_2/screens/login_screen.dart';
import 'package:mmamc_2/screens/signup_screen.dart';
import 'package:mmamc_2/test_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
final List pages = [MyCollege(), TestScreen(), LoginScreen()];
int currentIndex = 0;


  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: pages[currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: currentIndex,
        onDestinationSelected: (index){
          setState(() {
            currentIndex = index;
          });
        

        },
        destinations: [
        NavigationDestination(icon: Icon(Icons.home), label: 'Home'),
        NavigationDestination(icon: Icon(Icons.shopping_cart), label: 'product'),
        NavigationDestination(icon: Icon(Icons.person), label: 'profile'),
      ]),
    );
  }
}