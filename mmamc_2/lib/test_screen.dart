import 'package:flutter/material.dart';

class TestScreen extends StatefulWidget {
  const TestScreen({super.key});

  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
 int values = 0;
 void increment() {
  setState(() {
    values++;
  });
 }
  void decrement() {
    setState(() {
      values--;
    });
  }
  void reset() {
    setState(() {
      values = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    print("my current score is $values");
    return  Scaffold(
      // incremenet and decrement and reset
      floatingActionButton: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          spacing: 20,
          
        
          children: [
            FloatingActionButton(onPressed: () {
              increment();
              print("my current score is $values");
            },
              child: const Icon(Icons.add),
            
             ),
              FloatingActionButton(onPressed: () {
              decrement();
              print("my current score is $values");
            },
              child: const Icon(Icons.remove),
            
             ),
              FloatingActionButton(onPressed: () {
              reset();
              print("my current score is $values");
            },
              child: const Icon(Icons.refresh),
            
             ),
          ],
        ),
      ),
       // for decrement
      body: Column(
        children: [
          Center(child: Text('my current score is $values',
          style: TextStyle(fontSize: 30),)),
        ],
      ),
appBar: AppBar(
  title: Center(child: Text('Increment')),



),
    );
  }
}