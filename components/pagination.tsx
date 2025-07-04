// import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3, 4);
      pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <View className="flex-row items-center justify-center my-8">
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2">
        <Image
          source={icons.leftArrow}
          className="size-4"
          style={{ tintColor: currentPage === 1 ? "gray" : "white" }}
        />
      </TouchableOpacity>

      {pageNumbers.map((page, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page !== "number"}
          className={`mx-1 px-4 py-3 rounded-lg ${
            currentPage === page ? "bg-secondary" : ""
          }`}>
          <Text
            className={`text-light-300 font-bold ${
              currentPage === page ? "text-white" : ""
            }`}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2">
        <Image
          source={icons.rightArrow}
          className="size-4"
          style={{ tintColor: currentPage === totalPages ? "gray" : "white" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
