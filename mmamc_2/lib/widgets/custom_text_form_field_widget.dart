import 'package:flutter/material.dart';

class CustomTexFormField extends StatelessWidget {
  const CustomTexFormField({
    super.key,
    required this.hintText,
    required this.prefixIcon,
    this.suffixIcon, required this.textEditingController, this.validation,
  });

  final String hintText;
  final IconData prefixIcon;
  final IconData? suffixIcon;

  final TextEditingController textEditingController;
  final String? Function(String?)? validation;


  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: textEditingController,
      validator: validation,
      decoration: InputDecoration(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        prefixIcon: Icon(prefixIcon, color: Colors.black),
        suffixIcon: Icon(suffixIcon),
        hint: Text(hintText, style: const TextStyle(color: Colors.grey)),
      ),
    );
  }
}