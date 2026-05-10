import 'package:flutter/material.dart';
import 'package:mmamc_2/my_college.dart';
import 'package:mmamc_2/screens/main_screen.dart';
import 'package:mmamc_2/test_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

    @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'College App',
      theme: ThemeData(
        fontFamily: 'Roboto',
                                                                                                                                colorScheme: .fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MainScreen(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});



  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
  
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
                                    _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
                            return Scaffold(
      appBar: AppBar(
                                backgroundColor: Theme.of(context).colorScheme.inversePrimary,
                        title: Text(widget.title),
      ),
      body: Center(
                        child: Column(
                                                                                                                                            mainAxisAlignment: .center,
          children: [
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
