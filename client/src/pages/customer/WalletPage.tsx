import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Download, Send, CreditCard, Filter, Search } from 'lucide-react';
import { Header } from '../../components/customer/Header';
import { Footer } from '../../components/customer/Footer';
import { useGetWallet } from '../../hooks/customer/useWallet';
import Transaction from '../../components/customer/wallet/Transaction';
import { ITransaction, IWallet } from '../../types/wallet.type';

const WalletPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data } = useGetWallet()
    const wallet = data?.wallet as IWallet
    const transactions = (data?.transactions || []) as ITransaction[]

    return (
        <>
            <Header />
            <div className="bg-gray-50 min-h-screen p-8 mx-40">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">My Wallet</h1>
                        <div className="flex space-x-3">
                            <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition">
                                <Search size={20} />
                            </button>
                            <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-700 transition">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Balance Card */}
                    <div className="mt-6 bg-white text-gray-800 p-5 rounded-2xl shadow-md">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 font-medium">Available Balance</p>
                                <h2 className="text-3xl font-bold mt-1">₹{wallet?.balance?.toLocaleString()}</h2>
                            </div>
                            <button  className="bg-yellow-400 hover:bg-yellow-500 transition py-2 px-4 rounded-full flex items-center font-semibold shadow-md">
                                <Plus size={20} className="mr-1" /> Add Money
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="px-4 mt-6">
                    <div className="bg-white rounded-xl shadow-sm p-4">
                        <h3 className="font-bold text-lg mb-4">Transaction History</h3>

                        <div className="space-y-3">
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <Transaction transaction={transaction} />
                                ))
                            ) : (
                                <p>No transactions yet</p>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center space-x-2 mt-6">
                            <button
                                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-lg ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-200 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}

                            <span className="text-gray-500">...</span>

                            <button
                                className="w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-100"
                                onClick={() => setCurrentPage(10)}
                            >
                                10
                            </button>

                            <button
                                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WalletPage;