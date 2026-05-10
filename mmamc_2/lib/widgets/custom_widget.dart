
import 'package:flutter/material.dart';

class Customwidget extends StatelessWidget {
  const Customwidget({
    super.key, required this.icon, required this.color, required this.onTap,
  });
  final IconData icon;
  final Color color ;
 final VoidCallback onTap;


  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: (){
          onTap();
      },
      child: Container(
        decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(32)),
        child: Icon(icon, color: Colors.white, size: 30)),
    );
  }
}